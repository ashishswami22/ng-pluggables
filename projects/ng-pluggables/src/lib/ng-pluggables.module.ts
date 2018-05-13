import { NgModule } from '@angular/core';
import { NgPluggablesComponent } from './ng-pluggables.component';
import { AnalogClockComponent } from './components/analog-clock/analog-clock.component';
import { MicrophoneComponent } from './components/microphone/microphone.component';

@NgModule({
  imports: [
  ],
  declarations: [NgPluggablesComponent, AnalogClockComponent, MicrophoneComponent],
  exports: [NgPluggablesComponent, AnalogClockComponent, MicrophoneComponent]
})
export class NgPluggablesModule { }
