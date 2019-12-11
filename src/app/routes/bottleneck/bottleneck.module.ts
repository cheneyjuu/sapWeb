import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { BottleneckRoutingModule } from './bottleneck-routing.module';
import { BottleneckListComponent } from './list/list.component';

const COMPONENTS = [
  BottleneckListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    BottleneckRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class BottleneckModule { }
