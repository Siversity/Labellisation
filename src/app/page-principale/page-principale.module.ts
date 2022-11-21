import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PagePrincipaleRoutingModule } from './page-principale-routing.module';
import { PagePrincipaleComponent } from './page-principale.component';


@NgModule({
  declarations: [
    PagePrincipaleComponent,
  ],
  imports: [
    BrowserModule,
    PagePrincipaleRoutingModule
  ],
  providers: [],
  bootstrap: [PagePrincipaleComponent]
})
export class PagePrincipaleModule { }
