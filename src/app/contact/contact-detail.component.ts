import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { ListService } from '../services/list.service';
import { UdefService } from '../services/udef.service';

import { Contact } from './contact.interface';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UdefType, UserDefinedField } from '../model';

@Component({
  selector: 'app-contact-detail',
  styleUrls: ['./contact-detail.component.css'],
  template: `
  <div class="container">
    <p class="display-4">
        Selected Contact: {{selectedContactId > 0 ? selectedContactId : 'New Contact'}}
    </p>
    <form #contactForm="ngForm" *ngIf="selectedContact">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control"  [(ngModel)]="selectedContact.Name"
        id="name" name="name" required #name="ngModel">
        <div [hidden]="name.valid || name.pristine" class="alert alert-danger">Name is required</div>
        </div>

      <div class="form-group">
        <label for="department">Department</label>
        <input type="text" class="form-control" [(ngModel)]="selectedContact.Department" id="department" name="department">
      </div>

      <div class="form-group">
        <label for="orgnr">OrgNr</label>
        <input type="text" class="form-control" [(ngModel)]="selectedContact.OrgNr" id="orgnr" name="orgnr">
      </div>

      <div class="form-group">
        <label for="business">Category</label><br>
        <select class='select-option' [(ngModel)]='selectedContact.Category.Id' (ngModelChange)='onBusinessSelected($event)'
        name="category">
          <option class='option' *ngFor='let category of categoryList' [value]="category.Id">{{category.Name}}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="business">Business</label><br>
        <select class='select-option' [(ngModel)]='selectedContact.Business.Id' (ngModelChange)='onBusinessSelected($event)'
        name="business">
          <option class='option' *ngFor='let business of businessList' [value]="business.Id">{{business.Name}}</option>
        </select>
      </div>

      <div class="form-group">
      <label for="country">Country</label><br>
      <select class='select-option' [(ngModel)]='selectedContact.Country.CountryId' (ngModelChange)='onBusinessSelected($event)'
      name="country">
        <option class='option' *ngFor='let country of countryList' [value]="country.CountryId">{{country.Name}}</option>
      </select>
      </div>

      <div class="form-group">
        <label for="number1">Number1</label>
        <input type="text" class="form-control" [(ngModel)]="selectedContact.Number1" id="number1" name="number1">
      </div>

      <div class="form-group">
        <label for="number2">Number2</label>
        <input type="text" class="form-control" [(ngModel)]="selectedContact.Number2" id="number2" name="number2">
      </div>

      <div class="form-group">
          <div *ngFor="let udef of selectedContact.UserDefinedFields | mapToIterable:'key'">
            <label for="{{udef}}">Udef: {{ getUdefLabelByProgId(udef) }}, (progid: {{udef}})</label>
            <input type="text" class="form-control" [(ngModel)]="selectedContact.UserDefinedFields[udef]"
             id="{{udef}}" name="{{udef}}">
          </div>
      </div>

      <hr>
      <div class="row">
        <div class="col">
          <button type="submit" class="btn btn-success" (click)="saveContact()">Save</button>
          <button type="submit" class="btn btn-success" (click)="deleteContact(selectedContact.ContactId)">Delete</button>
        </div>
        <div class="col">
          <button *ngIf="selectedContact.ContactId > 0" type="submit" class="btn btn-primary" (click)="viewPersons()">View Persons</button>
        </div>
      </div>
      <hr>
      <button type="button"><a (click)="goBack()">Go Back</a></button>
    </form>
    <p>&nbsp;</p>
  </div>
  `
})
export class ContactDetailComponent implements OnInit {

  public selectedContact;
  public selectedContactId;

  public businessList;
  public categoryList;
  public countryList;

  private deleted;
  private udefDefinitions: UserDefinedField[];
  private udefNames


  constructor(private contactSvc: ContactService, private listService: ListService,
    private router: Router, private route: ActivatedRoute, private udefSvc: UdefService) { }

  ngOnInit() {

    this.listService.getBusinessList().subscribe(businesses => { this.businessList = businesses; });

    this.listService.getCategoryList().subscribe(categories => { this.categoryList = categories; });

    this.listService.getCountryList().subscribe(countries => { this.countryList = countries; });

    this.getUserDefinedFieldTypes();

    const contactId = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.selectedContactId = params.get('id');
        if (this.selectedContactId > 0) {
          this.contactSvc.getContact(this.selectedContactId).subscribe(contact => {
             this.selectedContact = contact;
            });
        } else {
          this.contactSvc.createContact().subscribe(contact => {this.selectedContact = contact; });
        }
    });
  }

  // trackByIndex(index: number, value: any) {
  //   return value.key;
  // }

  goBack() {
    // this.router.navigate(['/contacts/list', {id: this.selectedContactId}]);
    this.router.navigate(['../', {id: this.selectedContactId}], {relativeTo: this.route});
  }

  viewPersons() {
    this.router.navigate(['/persons', this.selectedContactId], {relativeTo: this.route});
  }

  saveContact() {
    this.contactSvc.saveContact(this.selectedContact).subscribe(contact => {
      this.selectedContact = contact;
      this.selectedContactId = contact.ContactId;
      console.log('Contact Saved!');
      this.router.navigate(['../', {id: this.selectedContactId}], {relativeTo: this.route});
    });
  }

  deleteContact(contactId) {
    this.contactSvc.deleteContact(contactId).subscribe(contact => {
      this.deleted = contact;
      this.router.navigate(['../', {id: 0}], {relativeTo: this.route});
    });
  }

  getUserDefinedFieldTypes() {
    this.udefSvc.getAllUdefFields('Contact').subscribe ( (udefs: UserDefinedField[]) => {
      this.udefDefinitions = udefs;
    });
  }

  getUdefLabelByProgId(progId: string): string {

    for (let udef of this.udefDefinitions) {
      if(udef.ProgId === progId) {
        return udef.FieldLabel;
      }
    }
    return '';
  }

  onBusinessSelected(data) {
    const a = '';
  }

}
