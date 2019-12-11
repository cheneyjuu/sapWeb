import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BottleneckListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: BottleneckListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BottleneckRoutingModule { }
