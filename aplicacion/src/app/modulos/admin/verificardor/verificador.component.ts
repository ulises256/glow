import { Component, ViewChild, ViewEncapsulation, OnInit  } from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-verificador',
  templateUrl: './verificador.component.pug',
  styleUrls: ['./verificador.component.styl'],
  encapsulation: ViewEncapsulation.None
})
export class VerificadorComponent implements OnInit {

   @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
            }
        }
        if (videoDevices.length > 0){
            let choosenDev;
            for (const dev of videoDevices){
                console.log(dev.label)
                if (dev.label.includes('back')){
                    choosenDev = dev;
                    break;
                }
            }
            if (choosenDev) {
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            } else {
                this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
            }
        }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
        console.log(result);
        result ?
        this.snackBar.open(result, 'dance', {
duration: 2000,
}) :     this.snackBar.open('Aun no se klee nbada', 'dance', {
      duration: 2000,
    });
    });
  }

}
