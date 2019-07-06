import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//------portal
import { FullLayoutComponent } from "./portal-layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./portal-layouts/content/content-layout.component";


import { Full_ROUTES } from "./portal-shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./portal-shared/routes/content-layout.routes";

import { PortalAuthGuard } from './portal-shared/auth/auth-guard.service';

//--------

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'apps'
  },
  //---------- portal
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [PortalAuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [PortalAuthGuard] },
  //---------------
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
