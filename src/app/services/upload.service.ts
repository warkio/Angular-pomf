import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PomfObject } from '../interfaces/pomf-object.interface';
import { PomfResponse } from '../interfaces/pomf-response.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(public http: HttpClient) { }

  public upload(
    files: PomfObject[], startingPoint: number
  ): { [key: string]: { progress: Observable<number> } } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};
    for (let i = startingPoint; i < files.length; i++) {
      const { file } = files[i];
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('files[]', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', environment.apiUrl + 'upload', formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
          let b = event.body;
          if (typeof(b) === 'string') {
            b = JSON.parse(b);
          }
          // @ts-ignore
          files[i].response = b;
        }
      }, (err) => {
        if (err.error.errorcode && err.error.description) {
          // Is a pomf response
          files[i].response = err.error;
        } else {
          // General http error
          files[i].response = {
            success: false,
            errorcode: err.status,
            description: err.statusText,
          };
        }
        progress.next(100);
        progress.complete();
      });

      // Save every progress-observable in a map of all observables
      files[i].progress = progress.asObservable();
    }
    // return the map of progress.observables
    return status;
  }
}
