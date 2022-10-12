import { SidebarDroiteComponent } from './sidebar-droite/sidebar-droite.component';
import { SidebarGaucheComponent } from './sidebar-gauche/sidebar-gauche.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path : 'sidebarGauche', component: SidebarGaucheComponent },
  { path : 'sidebarDroite', component: SidebarDroiteComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
