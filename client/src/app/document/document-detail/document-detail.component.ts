import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { NgSwitch } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, ParamMap, Route } from "@angular/router";

import { FileUploadComponent } from "../../file-upload/file-upload.component";

import { ListService } from "../../services/list.service";
import { ContactService } from "../../services/contact.service";
import { PersonService } from "../../services/person.service";
import { UdefService } from "../../services/udef.service";
import { DocumentService } from "../../services/document.service";
import { saveAs } from "file-saver";
import { error } from "util";
import { mime, lookup } from 'mime-types'

@Component({
  selector: "app-document-detail",
  templateUrl: "./document-detail.component.html",
  styleUrls: ["./document-detail.component.css"]
})
export class DocumentDetailComponent implements OnInit, AfterViewInit {

  @ViewChild(FileUploadComponent) fileUpload;

  public selectedDocument;
  public selectedDocumentId;
  public selectedDocumentTemplateId = 0;
  public showDropDown = false;
  public docTemplateList;
  public errorMessage;
  public udefDefinitions;
  public udefNames;
  public contacts;
  public people;
  public search;
  public selectedContact;
  public selectedPerson;

  private deleted;

  constructor(
    private listSvc: ListService,
    private udefSvc: UdefService,
    private docSvc: DocumentService,
    private contactSvc: ContactService,
    private personSvc: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserDefinedFieldTypes();

    this.listSvc.getDocTemplateList().subscribe(
      docTempList => {
        this.docTemplateList = docTempList;
      },
      error => {
        this.errorMessage = error;
      },
      () => {
        console.log("Document Details Loaded...");
      }
    );

    this.contactSvc.getContacts().subscribe(
      contactData => {
        this.contacts = contactData.value;
      },
      error => {
        this.errorMessage = error;
      }
    );

    const documentId = this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedDocumentId = params.get("id");

      if (this.selectedDocumentId > 0) {
        this.docSvc.getDocument(this.selectedDocumentId).subscribe(document => {
          this.selectedDocument = document;
          this.getAllPeople(this.selectedDocument.Contact.ContactId);
        });
      } else {
        this.docSvc.getDocument(0).subscribe(document => {
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

  ngAfterViewInit() {
    //nothing to do here...
  }

  receivedDocumentName($event) {
    this.selectedDocument.Name = $event;
  }

  getUserDefinedFieldTypes() {
    this.udefSvc.getAllProjectUdefFields().subscribe(udefs => {
      this.udefDefinitions = udefs;
    });
  }

  onDocTemplateItemSelected(selectedItem) {
    console.log("Selected item: " + selectedItem);
  }

  goBack() {
    this.router.navigateByUrl("/document");
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  getAllPeople(contactId) {
    if (+contactId === 0) {
      this.people = null;
      return;
    }

    this.personSvc.getAllPerson(contactId).subscribe(
      personData => {
        this.people = personData;
      },
      error => {
        this.errorMessage = error;
      }
    );
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
    this.contactSvc
      .getContact(contact.ColumnData.contactId.DisplayValue)
      .subscribe(
        contactEntity => {
          this.selectContact = contactEntity;
        },
        error => {
          this.errorMessage = error;
        }
      );
  }

  saveDocument() {

    // update the document definition in the database

    this.docSvc.saveDocument(this.selectedDocument).subscribe(document => {
      this.selectedDocument = document;
      this.selectedDocumentId = document.DocumentId;
    });

    console.log("Document Saved!");
    this.router.navigate(["../", { id: this.selectedDocumentId }], {
      relativeTo: this.route
    });
  }

  saveNewDocument() {

    // if document name, save using file-upload

    if(this.selectedDocument.Name) {
      this.docSvc.createDocument(this.selectedDocument).subscribe(document => {

        // create the document definition in the database

        this.selectedDocument = document;
        this.selectedDocumentId = document.DocumentId;

        this.fileUpload.uploadFileToActivity(this.selectedDocumentId);

      });
    } else {

      // else save using document template

      this.docSvc.createDocument(this.selectedDocument).subscribe(document => {

        // create the document definition in the database

        this.selectedDocument = document;
        this.selectedDocumentId = document.DocumentId;

        // create the physical document in the document archive

        this.docSvc.createDocumentByTemplate(this.selectedDocumentId).subscribe(docByTemplate => {
              this.selectedDocument = docByTemplate;
              this.selectedDocumentId = docByTemplate.DocumentId;
          });
      });
    }

    console.log("Document Saved!");
    this.router.navigate(["../", { id: this.selectedDocumentId }], {
      relativeTo: this.route
    });
  }

  deleteDocument(documentId: number) {
    this.docSvc.deleteDocument(documentId).subscribe(document => {
      this.deleted = document;
      this.router.navigateByUrl('/document');
    });
  }

  uploadFile() {
    this.fileUpload.uploadFileToActivity(this.selectedDocumentId);
  }

  downloadFile() {
    const contentType = this.getContentType();

    this.docSvc
      .downloadDocument(
        this.selectedDocument.DocumentId,
        this.selectedDocument.Name,
        contentType
      )
      .subscribe(
        document => {
          saveAs(document, this.selectedDocument.Name);
          console.log("Document saved!");
        },
        error => console.log(error)
      );
  }

  getContentType(): string {
    let mimeType = lookup(this.selectedDocument.Name) || 'application/octet-stream';
    return mimeType;
  }
}
