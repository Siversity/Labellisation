import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarGaucheComponent } from './sidebar-gauche/sidebar-gauche.component';
import { SidebarDroiteComponent } from './sidebar-droite/sidebar-droite.component';


const routes: Routes = [
  { path: 'sidebarGauche', component: SidebarGaucheComponent },
  { path: 'sidebarDroite', component: SidebarDroiteComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PageEditionRoutingModule { }
