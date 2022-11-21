import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageEditionComponent } from 'src/app/page-edition/page-edition.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class PagePrincipaleRoutingModule { }
