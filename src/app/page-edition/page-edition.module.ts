import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PageEditionRoutingModule } from './page-edition-routing.module';
import { PageEditionComponent } from './page-edition.component';
import { SidebarDroiteComponent } from './sidebar-droite/sidebar-droite.component';
import { SidebarGaucheComponent } from './sidebar-gauche/sidebar-gauche.component';
import { ListeImageComponent } from './liste-image/liste-image.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [
    PageEditionComponent,
    SidebarGaucheComponent,
    SidebarDroiteComponent,
    ImageComponent,
    ListeImageComponent
  ],
  imports: [
    BrowserModule,
    PageEditionRoutingModule
  ],
  providers: [],
  bootstrap: [PageEditionComponent]
})
export class PageEditionModule { }
