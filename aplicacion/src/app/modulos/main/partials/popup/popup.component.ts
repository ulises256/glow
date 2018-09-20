import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,
    ViewChild
  } from '@angular/core';
  import {OverlayOrigin} from '@angular/cdk/overlay';
  import {Observable} from 'rxjs/Observable';
  import {fromEvent} from 'rxjs/observable/fromEvent'
  import {Subject} from 'rxjs/Subject';
  
  @Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class PopupComponent implements OnDestroy, OnInit {
    @Input() overlayOrigin: OverlayOrigin;
    @Output() close = new EventEmitter<any>();
    @Output() open = new EventEmitter<any>();
  
    @ViewChild('dialog') dialog: ElementRef;
    isOpened = false;
    destroy$ = new Subject<any>();
  
    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }
  
    ngOnInit(): void {
      const overlayOriginEl = this.overlayOrigin.elementRef.nativeElement;
  
      // open popup if mouse stopped in overlayOriginEl (for short time).
      // If user just quickly got over overlayOriginEl element - do not open
      const open$ = Observable.fromEvent(overlayOriginEl, 'mouseenter')
        .filter(() => !this.isOpened)
        .switchMap(enterEvent =>
          Observable.fromEvent(document, 'mousemove')
            .startWith(enterEvent)
            .debounceTime(300)
            .filter(event => overlayOriginEl === event['target'])
        )
        .share();
      open$
        .takeUntil(this.destroy$)
        .subscribe(() => this.changeState(true));
  
      // close if mouse left the overlayOriginEl and dialog(after short delay)
      const close$ = Observable.fromEvent(document, 'mousemove')
        .debounceTime(100)
        .filter(() => this.isOpened)
        .filter(event => this.isMovedOutside(overlayOriginEl, this.dialog, event));
  
      open$
        .takeUntil(this.destroy$)
        .switchMapTo(close$)
        .subscribe(() => {
          this.changeState(false);
        });
    }
  
    ngOnDestroy(): void {
      this.destroy$.next();
    }
  
    connectedOverlayDetach() {
      this.changeState(false);
    }
  
    private changeState(isOpened: boolean) {
      this.isOpened = isOpened;
      isOpened ? this.open.emit() : this.close.emit();
      this.changeDetectorRef.markForCheck();
    }
  
    private isMovedOutside(overlayOriginEl, dialog, event): boolean {
      return !(overlayOriginEl.contains(event['target']) ||     dialog.nativeElement.contains(event['target']));
    }
  }
  