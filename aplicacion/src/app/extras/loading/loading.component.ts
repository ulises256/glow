import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.pug',
  styleUrls: ['./loading.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoadingComponent>) {
    dialogRef.disableClose = true;
   }

  ngOnInit() {

  }

  submit() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
