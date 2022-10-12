import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarGaucheComponent } from './sidebar-gauche/sidebar-gauche.component';
import { SidebarDroiteComponent } from './sidebar-droite/sidebar-droite.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarGaucheComponent,
    SidebarDroiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
