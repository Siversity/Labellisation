import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PageEditionRoutingModule } from './page-edition-routing.module';
import { PageEditionComponent } from './page-edition.component';
import { SidebarDroiteComponent } from './sidebar-droite/sidebar-droite.component';
import { SidebarGaucheComponent } from './sidebar-gauche/sidebar-gauche.component';

@NgModule({
  declarations: [
    PageEditionComponent,
    SidebarGaucheComponent,
    SidebarDroiteComponent
  ],
  imports: [
    BrowserModule,
    PageEditionRoutingModule
  ],
  providers: [],
  bootstrap: [PageEditionComponent]
})
export class PageEditionModule { }
