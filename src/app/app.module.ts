import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SelectionComponent } from './selection/selection.component';
import { GraphsComponent } from './graphs/graphs.component';
import { ChartModule } from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectionComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    CalendarModule,
    FormsModule,
    BrowserAnimationsModule ,
    HttpClientModule,
    ReactiveFormsModule  
  ],
  providers: [DataService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
