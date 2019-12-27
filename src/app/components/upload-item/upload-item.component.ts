import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { PomfObject } from 'src/app/interfaces/pomf-object.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PomfResponse } from 'src/app/interfaces/pomf-response.interface';


@Component({
  selector: 'app-upload-item-dialog',
  templateUrl: 'upload-item-dialog.html',
})
export class UploadItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UploadItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {resp: PomfResponse}) {  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss']
})
export class UploadItemComponent implements OnInit {

  @Input() file: PomfObject;
  @Output() clickedDelete = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  openInfoDialog() {
    const dialogRef = this.dialog.open(UploadItemDialogComponent, {
      data: {resp: this.file.response}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}
