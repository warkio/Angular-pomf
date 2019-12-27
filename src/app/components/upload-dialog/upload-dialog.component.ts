import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';
import { PomfObject } from 'src/app/interfaces/pomf-object.interface';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  constructor(private uploadService: UploadService) { }

  uploading = false;
  lastIndex = 0;

  @ViewChild('file', null) file;
  public files: PomfObject[] = [];
  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.push({
          file: files[key]
        });
      }
    }
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {
    // set the component state to "uploading"
    this.uploading = true;
    // start the upload and save the progress map
    this.uploadService.upload(this.files, this.lastIndex);
    // convert the progress map into an array
    const allProgressObservables = [];
    // tslint:disable-next-line: forin
    for (let i = this.lastIndex; i < this.files.length; i++) {
      const f = this.files[i];
      allProgressObservables.push(f.progress);
    }
    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... and the component is no longer uploading
      this.uploading = false;
      this.lastIndex = this.files.length;
    });
  }

  ngOnInit() {
  }

}
