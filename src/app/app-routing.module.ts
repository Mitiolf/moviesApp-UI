import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CollectionComponent } from "./collection/collection.component";
import { HomepageLogedComponent } from "./homepage-loged/homepage-loged.component";



const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'homepage', component: HomepageLogedComponent},
  {path: 'catalog', component: CollectionComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
