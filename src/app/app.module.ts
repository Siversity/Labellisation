import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageComponent } from './page-edition/image/image.component';
import { PageEditionComponent } from './page-edition/page-edition.component';
import { SidebarDroiteComponent } from './page-edition/sidebar-droite/sidebar-droite.component';
import { SidebarGaucheComponent } from './page-edition/sidebar-gauche/sidebar-gauche.component';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';
import { ListeImageComponent } from './page-edition/liste-image/liste-image.component';


@NgModule({
  declarations: [
    AppComponent,
    PagePrincipaleComponent,
    PageEditionComponent,
    SidebarGaucheComponent,
    SidebarDroiteComponent,
    ImageComponent,
    ListeImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
