import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
declare var MediaRecorder: any;

@Component({
  selector: 'ng-pluggable-microphone',
  templateUrl: './microphone.component.html',
  styleUrls: ['./microphone.component.css']
})
export class MicrophoneComponent implements OnInit, AfterViewInit {
  @ViewChild('microphone') microphone;
  @Output('recognize') recognize: EventEmitter<Blob> = new EventEmitter<Blob>();
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var me = this;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true
        })

        // Success callback
        .then(function (stream) {

          var mediaRecorder = new MediaRecorder(stream);
          var chunks = [];

          mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
          }

          mediaRecorder.onstop = function (e) {
            var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
            chunks = [];
            me.recognize.emit(blob);
          }

          me.microphone.nativeElement.onmousedown = function () {
            mediaRecorder.start();
          }

          me.microphone.nativeElement.onmouseup = function () {
            mediaRecorder.stop();
          }


        })

        // Error callback
        .catch(function (err) {
          console.log('ng-pluggable-microphone: ' + err);
        }
        );
    } else {
      console.log('ng-pluggable-microphone: getUserMedia not supported on your browser!');
    }

  }

}
