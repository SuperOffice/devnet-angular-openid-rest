import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular5-toaster';

import { FileUploadService, WebhookService, DocumentService, SaleService, ProjectService, PersonService, UdefService, ListService, ContactService, AuthService, AuthGuardService } from './services';
import { WebhookSocketService } from './services/webhooksocket.service';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactListComponent } from './contact/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail.component';
import { WebhookComponent } from './webhook/webhook.component';
import { WebhookDetailsComponent } from './webhook/details/webhookdetails.component';

import { MapToIterablePipe } from './pipes/maptoiterable.pipe';
import { EnumToIterablePipe } from './pipes/enumtoiterable.pipe';

import { PersonComponent } from './person/person.component';
import { PersonlistComponent } from './person/personlist.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { SaleComponent } from './sale/sale.component';
import { SaleDetailsComponent } from './sale/sale-details/sale-details.component';
import { DocumentComponent } from './document/document.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';

import { ClickOutsideDirective } from './shared/dropdown.directive';
import { ToasterContainerComponent } from 'angular5-toaster';
import { FileUploadComponent } from './file-upload/file-upload.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AppNavbarComponent,
    HomeComponent,
    ContactComponent,
    AuthCallbackComponent,
    NotfoundComponent,
    ContactListComponent,
    ContactDetailComponent,
    MapToIterablePipe,
    EnumToIterablePipe,
    PersonComponent,
    PersonlistComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    SaleComponent,
    SaleDetailsComponent,
    DocumentComponent,
    DocumentDetailComponent,
    ClickOutsideDirective,
    WebhookComponent,
    WebhookDetailsComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToasterModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthService,
    ContactService,
    DocumentService,
    ListService,
    PersonService,
    ProjectService,
    SaleService,
    UdefService,
    WebhookService,
    WebhookSocketService,
    FileUploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
