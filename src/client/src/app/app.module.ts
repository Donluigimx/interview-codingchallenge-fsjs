import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule, MatButtonModule, MatIconModule } from '@angular/material';


import { AppComponent } from './app.component';
import { ListsComponent } from './lists/lists.component';


@NgModule({
  declarations: [
    AppComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,    
    FormsModule,    
    BrowserAnimationsModule,
    // Material Modules
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
