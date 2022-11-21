import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageComponent } from './page-edition/image/image.component';
import { PageEditionComponent } from './page-edition/page-edition.component';
import { SidebarDroiteComponent } from './page-edition/sidebar-droite/sidebar-droite.component';
import { SidebarGaucheComponent } from './page-edition/sidebar-gauche/sidebar-gauche.component';
import { PagePrincipaleComponent } from './page-principale/page-principale.component';

const routes: Routes = [
  { path: 'principale', component: PagePrincipaleComponent },
  { path: 'edition/:nomImage', component: PageEditionComponent, children: [
    {
      path:'sidebarGauche', component: SidebarGaucheComponent
    },
    {
      path:'image', component: ImageComponent
    },
    {
      path:'sidebarDroite', component: SidebarDroiteComponent
    }
  ] },
  { path: '',   redirectTo: '/principale', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
