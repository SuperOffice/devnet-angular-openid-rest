import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/authguard.service';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ContactComponent } from './contact/contact.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactListComponent } from './contact/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail.component';
import { PersonComponent } from './person/person.component';
import { PersonlistComponent } from './person/personlist.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { SaleComponent } from './sale/sale.component';
import { SaleDetailsComponent } from './sale/sale-details/sale-details.component';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { WebhookComponent } from './webhook/webhook.component';
import { WebhookDetailsComponent } from './webhook/details/webhookdetails.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ('/home'),
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'person',
    component: PersonComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'persons',
    component: PersonlistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'persons/:id',
    component: PersonlistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contacts',
    component: ContactListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contacts/:id',
    component: ContactDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'project',
    component: ProjectComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'projects/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sale',
    component: SaleComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sales/:id',
    component: SaleDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'document',
    component: DocumentComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'documents/:id',
    component: DocumentDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'webhook',
    component: WebhookComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'webhook/:id',
    component: WebhookDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
