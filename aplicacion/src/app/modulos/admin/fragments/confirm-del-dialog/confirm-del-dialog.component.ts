import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-del-dialog',
  templateUrl: './confirm-del-dialog.component.pug',
  styleUrls: ['./confirm-del-dialog.component.styl']
})
export class ConfirmDelDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDelDialogComponent>, 
		@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {

  }

  submit() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
