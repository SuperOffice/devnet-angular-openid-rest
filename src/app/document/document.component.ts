import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { ListService } from '../services/list.service';
import { UdefService } from '../services/udef.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  private documents;
  private docTemplateList;
  private selectedDocumentTemplateId = 0;
  private errorMessage;
  private isLoaded;

  constructor(private docSvc: DocumentService, private listSvc: ListService,
  private udefSvc: UdefService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.docSvc.getAllDocuments()
    .subscribe( documentList => {
      this.documents = documentList;
    }, error => {
      this.errorMessage = error;
    }, () => {
      this.isLoaded = true;
    });
  }

  onDocTemplateItemSelected(itemData) {
    const selectedItem = itemData;
    console.log('Selected item: ' + itemData);
  }
}
