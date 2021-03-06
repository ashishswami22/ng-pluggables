import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'ng-pluggable-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.css']
})
export class AnalogClockComponent implements OnInit, AfterViewInit {
  @Input() size = 400;
  @ViewChild('canvas') canvas;
  @Input() gradiantA = '#333';
  @Input() gradiantB = 'white';
  @Input() timezoneOffsetInMinutes;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var canvas = this.canvas.nativeElement;
    var ctx = canvas.getContext("2d");
    var radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    setInterval(() => this.drawClock(ctx, radius), 1000);
  }

  drawClock(ctx, radius) {
    this.drawFace(ctx, radius);
    this.drawNumbers(ctx, radius);
    this.drawTime(ctx, radius);
  }

  drawFace(ctx, radius) {
    var grad;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.gradiantB;
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, this.gradiantA);
    grad.addColorStop(0.5, this.gradiantB);
    grad.addColorStop(1, this.gradiantA);
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = this.gradiantA;
    ctx.fill();
  }

  drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillStyle = this.gradiantA;
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  drawTime(ctx, radius) {
    var now = this.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
  }

  drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }

  getDate() {
    if (isNaN(this.timezoneOffsetInMinutes)) {
      return new Date();
    }
    // create Date object for current location
    const d = new Date();

    // convert to millisec
    // add local time zone offset
    // get UTC time in millisec
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object using supplied offset
    return new Date(utc + (60000 * this.timezoneOffsetInMinutes));
  }

}
