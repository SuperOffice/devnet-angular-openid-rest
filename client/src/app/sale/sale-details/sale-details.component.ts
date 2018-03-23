import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { ContactService } from '../../services/contact.service';
import { PersonService } from '../../services/person.service';
import { ListService } from '../../services/list.service';
import { UdefService } from '../../services/udef.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {

  public selectedSaleId;
  public selectedSale;
  public errorMessage;
  public saleTypeList;
  public saleStatusList;
  public udefDefinitions;
  public udefNames;
  public people;
  public contacts;

  constructor(private saleSvc: SaleService, private listSvc: ListService, private contactSvc: ContactService,
    private personSvc: PersonService, private udefSvc: UdefService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.listSvc.getSaleTypeList().subscribe(saleTypes => { this.saleTypeList = saleTypes; });
    this.getUserDefinedFieldTypes();

    const saleId = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.selectedSaleId = params.get('id');
        if (this.selectedSaleId > 0) {
          this.saleSvc.getSale(this.selectedSaleId)
          .subscribe(sale => {
             this.selectedSale = sale;
             this.setContactAndPersonFields();
          });
        } else {
          this.saleSvc.getSale(0)
          .subscribe(sale => {
            this.selectedSale = sale;
            this.setContactAndPersonFields();
          });
        }
    });

    this.contactSvc.getContacts()
    .subscribe( contactData => {
      this.contacts = contactData.value;
    }, error => {
      this.errorMessage = error;
    });
  }

  setContactAndPersonFields() {
    if(!this.selectedSale.Contact){
      this.selectedSale.Contact = { ContactId: 0 };
    } else {
      this.people = this.getAllPeople(this.selectedSale.Contact.ContactId);
    }
    if(!this.selectedSale.Person) {
      this.selectedSale.Person =  { PersonId:  0 };
    }
  }

  getUserDefinedFieldTypes() {
    this.udefSvc.getAllSaleUdefFields().subscribe ( udefs => {
      this.udefDefinitions = udefs;
    });
  }

  getUdefLabelByProgId(progId: string): string {
    for (let udef of this.udefDefinitions) {
      if (udef.ProgId === progId) {
        return udef.FieldLabel;
      }
    }
    return "";
  }

  saveSale() {
    this.saleSvc.saveSale(this.selectedSale)
    .subscribe(sale => {
      this.selectedSale = sale;
    }, error => {
      this.errorMessage = error;
    }, () => {
      // saved...
      this.goBack();
    });
  }

  deleteSale(saleId) {
    this.saleSvc.deleteSale(saleId)
    .subscribe(sale => {
      const ok = sale;
    }, error => {
      this.errorMessage = error;
    }, () => {
      this.goBack();
    });
  }

  goBack() {
    this.router.navigateByUrl('/sale');
  }

  onSaleTypeSelected(eventData) {
    const saleData = eventData;
  }

  getAllPeople(contactId) {

    if (+contactId === 0) {
      this.people = null;
      return;
    }

    this.personSvc.getAllPerson(contactId)
    .subscribe( personData => {
      this.people = personData;
    }, error => {
      this.errorMessage = error;
    });
  }

  contactChanged(contactId) {
      this.selectedSale.Contact.ContactId = contactId;

      this.getAllPeople(contactId);

      this.selectedSale.Person = { PersonId: 0 };
  }

  personChanged(personId) {
      this.selectedSale.Person.PersonId = personId;
  }

  getSaveTitle(): string {
    return this.selectedSale.SaleId > 0 ? `PUT api/v1/Sale/${this.selectedSale.SaleId} (sale json in body)` : `POST api/v1/Sale (sale json in body)`;
  }
}
