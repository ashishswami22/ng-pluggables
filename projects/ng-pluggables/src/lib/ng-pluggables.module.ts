import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnalogClockComponent } from './components/analog-clock/analog-clock.component';
import { MicrophoneComponent } from './components/microphone/microphone.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    AnalogClockComponent,
    MicrophoneComponent,
    CurrencyConverterComponent
  ],
  exports: [
    AnalogClockComponent,
    MicrophoneComponent,
    CurrencyConverterComponent
  ]
})
export class NgPluggablesModule { }
