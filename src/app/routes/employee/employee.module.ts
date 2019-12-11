import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './list/list.component';

const COMPONENTS = [
  EmployeeListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    EmployeeRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class EmployeeModule { }
