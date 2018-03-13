import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { ContactService } from '../../services/contact.service';
import { PersonService } from '../../services/person.service';
import { UdefService } from '../../services/udef.service';
import { DocumentService } from '../../services/document.service';
import { ActivatedRoute, Router, ParamMap, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  private selectedDocument;
  private selectedDocumentId;
  private selectedDocumentTemplateId = 0;
  private showDropDown = false;
  private docTemplateList;
  private errorMessage;
  private udefDefinitions;
  private udefNames;
  private contacts;
  private people;
  private search;
  private selectedContact;
  private selectedPerson;

  constructor(private listSvc: ListService, private udefSvc: UdefService,
  private docSvc: DocumentService, private contactSvc: ContactService,
  private personSvc: PersonService, private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.getUserDefinedFieldTypes();

    this.listSvc.getDocTemplateList()
    .subscribe( docTempList => {
      this.docTemplateList = docTempList;
    }, error => {
      this.errorMessage = error;
    }, () => {
      console.log('Document Details Loaded...');
    });

    this.contactSvc.getContacts()
    .subscribe( contactData => {
      this.contacts = contactData.value;
    }, error => {
      this.errorMessage = error;
    });

    const documentId = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.selectedDocumentId = params.get('id');
        if (this.selectedDocumentId > 0) {
          this.docSvc.getDocument(this.selectedDocumentId)
          .subscribe(document => {
             this.selectedDocument = document;
             this.getAllPeople(this.selectedDocument.Contact.ContactId);
          });
        } else {
          this.docSvc.getDocument(0)
          .subscribe(document => {
            this.selectedDocument = document;
            this.selectedDocument.DocumentTemplate = {
              DocumentTemplateId: 0
            };

            this.selectedDocument.Contact = {
              ContactId: 0
            };

            this.selectedDocument.Person = {
              PersonId: 0
            };
          });
        }
    });
  }

  getUserDefinedFieldTypes() {
    this.udefSvc.getAllProjectUdefFields().subscribe ( udefs => {
      this.udefDefinitions = udefs;
    });
  }

  onDocTemplateItemSelected(selectedItem) {
    console.log('Selected item: ' + selectedItem);
  }

  goBack() {
    this.router.navigateByUrl('/document');
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
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
    this.selectedDocument.Contact.ContactId = contactId;

    this.getAllPeople(contactId);

    this.selectedDocument.Person = { PersonId: 0 };
}

personChanged(personId) {
    this.selectedDocument.Person.PersonId = personId;
}

  selectContact(contact) {
    this.contactSvc.getContact(contact.ColumnData.contactId.DisplayValue)
    .subscribe( contactEntity => {
      this.selectContact = contactEntity;
    }, error => {
      this.errorMessage = error;
    });
  }
}
