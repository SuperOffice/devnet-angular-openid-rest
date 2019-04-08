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
import { AuthService } from "../../services";
import { error } from "util";
// remove mime-types due to dependencies on path...
// import { mime, lookup } from 'mime-types';
import { Claims } from "../../model";
import { Contact } from "../../contact/contact.interface";

@Component({
  selector: "app-document-detail",
  templateUrl: "./document-detail.component.html",
  styleUrls: ["./document-detail.component.css"]
})
export class DocumentDetailComponent implements OnInit, AfterViewInit {
  @ViewChild(FileUploadComponent) fileUpload;

  public selectedDocument;
  public selectedDocumentId: number;
  public selectedDocumentTemplateId = 0;
  public showDropDown = false;
  public docTemplateList;
  public errorMessage;
  public udefDefinitions;
  public udefNames;
  public contacts;
  public people;
  public search;
  public selectedContact: Contact;
  public selectedPerson;

  private deleted;
  private claims: Claims;

  constructor(
    private listSvc: ListService,
    private udefSvc: UdefService,
    private docSvc: DocumentService,
    private contactSvc: ContactService,
    private personSvc: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private authSvc: AuthService
  ) {}

  ngOnInit() {
    this.claims = this.authSvc.getClaims();

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
      this.selectedDocumentId = Number(params.get("id"));

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

          this.selectedDocument.Associate = {
            AssociateId: this.claims.associateid
          };
        });
      }
    });
  }

  ngAfterViewInit() {
    // nothing to do here...
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
          this.selectedContact = contactEntity;
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

    if (this.selectedDocument.Name) {
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

        this.docSvc
          .createDocumentByTemplate(this.selectedDocumentId)
          .subscribe(docByTemplate => {
            this.selectedDocument = docByTemplate;
            this.selectedDocumentId = docByTemplate.DocumentId;
          });
      });
    }

    console.log("Document Saved!");
    this.router.navigateByUrl("/document");
  }

  deleteDocument(documentId: number) {
    this.docSvc.deleteDocument(documentId).subscribe(document => {
      this.deleted = document;
      this.router.navigateByUrl("/document");
    });
  }

  uploadFile() {
    this.fileUpload.uploadFileToActivity(this.selectedDocumentId);
  }

  downloadFile() {
    const contentType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    this.docSvc
      .downloadDocument(
        this.selectedDocument.DocumentId,
        this.selectedDocument.Name,
        contentType
      )
      .subscribe(
        doc => {
          console.log(`Document returned (length): ${doc.size}`);

          /*
            Here the document must be saved or shown.

            This is left undone for others to implement
            as they choose...
          */
          const downloadLink = document.createElement("a");
          downloadLink.download = this.selectedDocument.Name;
          downloadLink.innerHTML = "Download File";
          downloadLink.href = window.URL.createObjectURL(doc);
          downloadLink.addEventListener(
            "click",
            function(e) {
              document.body.removeChild(downloadLink);
              //e.preventDefault(); // prevent navigation to "#"
            },
            false
          );

          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);

          downloadLink.click();
        },
        error => console.log(error)
      );
  }

  // getContentType(): string {
  //   let mimeType = lookup(this.selectedDocument.Name) || 'application/octet-stream';
  //   return mimeType;
  // }
}
