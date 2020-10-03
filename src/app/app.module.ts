import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TableInlineEditComponent } from './table-inline-edit/table-inline-edit.component';
import { TableRowComponent } from './table-row/table-row.component';
import { ModelComponent } from './model/model.component';
import { InvalidRequestComponent } from './invalid-request/invalid-request.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InsideRowComponent } from './table-inline-edit/inside-row/inside-row.component';
import { ServicesService } from './services/services.service';
import { ConstantsService } from './services/constants.service';


@NgModule({
  declarations: [
    AppComponent,
    TableInlineEditComponent,
    TableRowComponent,
    ModelComponent,
    InvalidRequestComponent,
    InsideRowComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    ServicesService,
    ConstantsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
