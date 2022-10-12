import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PageEditionRoutingModule } from './page-edition-routing.module';
import { PageEditionComponent } from './page-edition.component';

@NgModule({
  declarations: [
    PageEditionComponent
  ],
  imports: [
    BrowserModule,
    PageEditionRoutingModule
  ],
  providers: [],
  bootstrap: [PageEditionComponent]
})
export class PageEditionModule { }
