import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicaComponent } from './pica/pica.component';
import { PiceComponent } from './pice/pice.component';

const routes: Routes = [
  {path: '', component: PicaComponent},
  {path: 'pice/:id', component: PiceComponent},
  {path: '**', component: PicaComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
