import { Component, Input, Output, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.pug',
  styleUrls: ['./file-upload.component.styl'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FileUploadComponent),
        multi: true
    }
]
})
export class FileUploadComponent implements ControlValueAccessor {
  selectedFileName: string = null;
  @Input() showFileNameInput: boolean;
  @Input() iconButton: string= 'attach_file';
  @Input() description: string ='Añadir archivo';
  @Input() typeIcon: boolean= true;

  writeValue(value: any) {
    //Handle write value
 }
 propagateChange = (_: any) => { };
 registerOnChange(fn) {
     this.propagateChange = fn;
 }
 registerOnTouched() { }

 changeListener($event): void {
     // debugger; // uncomment this for debugging purposes
     this.readThis($event.target);
 }
 readThis(inputValue: any): void {
     // debugger; // uncomment this for debugging purposes
     var file: File = inputValue.files[0];
     var myReader: FileReader = new FileReader();

     myReader.onloadend = (e) => {
         this.propagateChange(myReader.result);
         this.selectedFileName = file.name;
     }
     myReader.readAsDataURL(file);
 }

}
