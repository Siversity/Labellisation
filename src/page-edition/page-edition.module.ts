import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PageEditionRoutingModule } from './page-edition-routing.module';
import { PageEditionComponent } from './page-edition.component';
import { SidebarDroiteComponent } from './sidebar-droite/sidebar-droite.component';
import { SidebarGaucheComponent } from './sidebar-gauche/sidebar-gauche.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageComponent } from './image/image.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    PageEditionComponent,
    SidebarGaucheComponent,
    SidebarDroiteComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    PageEditionRoutingModule,
    BrowserAnimationsModule,
    NgxImageZoomModule
  ],
  providers: [],
  bootstrap: [PageEditionComponent]
})
export class PageEditionModule { }
