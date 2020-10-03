import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';

import { TableInlineEditComponent } from './table-inline-edit/table-inline-edit.component'
import { InvalidRequestComponent } from './invalid-request/invalid-request.component'
import { TableRowComponent } from './table-row/table-row.component';


const routes: Routes = [
  {
    path: '',
    component: TableInlineEditComponent
  },
  {
    path: 'editrow',
    component: TableRowComponent
  },
  {
    path: '**', component: InvalidRequestComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
