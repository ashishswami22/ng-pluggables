import { NgModule } from '@angular/core';
import { NgPluggablesComponent } from './ng-pluggables.component';
import { AnalogClockComponent } from './components/analog-clock/analog-clock.component';

@NgModule({
  imports: [
  ],
  declarations: [NgPluggablesComponent, AnalogClockComponent],
  exports: [NgPluggablesComponent, AnalogClockComponent]
})
export class NgPluggablesModule { }
