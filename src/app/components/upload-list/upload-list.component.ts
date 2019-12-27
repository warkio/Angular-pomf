import { Component, OnInit, Input } from '@angular/core';
import { PomfObject } from 'src/app/interfaces/pomf-object.interface';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {

  @Input() files: PomfObject[];
  constructor() { }

  deleteItem(index) {
    this.files.splice(index, 1);
  }

  ngOnInit() {
  }

}
