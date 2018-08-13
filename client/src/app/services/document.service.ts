import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { Claims } from '../model';
import { SoBaseService } from './sobase.service';

@Injectable()
export class DocumentService extends SoBaseService {

  private queryAllDocuments = {
    ProviderName: 'FindDocument',
    Columns: 'documentId,text,document/description',
    Restrictions: 'documentId > 0',
    Entities: 'document',
    Page: 0,
    PageSize: 20
  };

  constructor(private injector: Injector) {
    super('Document', injector);
  }

  getAllDocuments(): Observable<any> {
    return this.http
      .post<any>(
        this.claims.webapi_url + '/Agents/Archive/GetArchiveListByColumns2',
        this.queryAllDocuments,
        this.options
      )
      .catch(this.onError);
  }

  getDocument(documentId): Observable<any> {
    return this.get(documentId);
  }

  getDocumentProperties(documentId: number): Observable<any> {
    return this.http
      .get<any>(
        `${this.claims.webapi_url}/Document/${documentId}/Property`,
        this.options
      )
      .catch(this.onError);
  }

  downloadDocument(
    documentId: number,
    fileName: string,
    fileType: string
  ): Observable<Blob> {

    console.log(
      `[Doc]: ${documentId}, [Filename]: ${fileName}, [Filetype]: ${fileType}`
    );

    return this.http
      .get(`${this.claims.webapi_url}/Document/${documentId}/Content`, {
        headers: new HttpHeaders({
          Authorization: this.authService.getAuthorizationHeaderValue(),
          Accept: fileType,
        }),
        responseType: 'blob'
      })
      .catch(this.onError);
  }

  downloadAppFile(
    documentId: number,
    fileName: string,
    fileType: string,
    start: () => void,
    stop: () => void
  ): Observable<any> {
    const dlOptions = {
      headers: new HttpHeaders({
        Authorization: this.authService.getAuthorizationHeaderValue(),
        Accept: fileType
      }),
      responseType: 'blob'
    };

    return this.http
      .get(
        `${this.claims.webapi_url}/Document/${documentId}/Content`,
        this.options
      )
      .do(start)
      .map(res => res)
      .finally(stop)
      .catch(this.onError);
  }

  deleteDocument(documentId: number): Observable<any> {
    return this.delete(documentId);
  }

  createDocument(document: any): Observable<any> {
    return this.http
      .post(`${this.claims.webapi_url}/Document/`, document, this.options)
      .catch(this.onError);
  }

  createDocumentByTemplate(
    documentId: number,
    contactId?: number,
    personId?: number,
    appointmentId?: number,
    saleId?: number,
    selectionId?: number,
    projectId?: number,
    uiCulture?: string
  ): Observable<any> {
    // `${this.claims.webapi_url}/Document/${documentId}/Content/?contactId=${contact}
    // &personId=${person}&appointmentId=${appointment}&saleId=${sale}&selectionId=${selection}&projectId=${project}&uiCulture=${culture}`,

    let url = `${this.claims.webapi_url}/Document/${documentId}/Content?`;

    if (contactId) {
      url += this.getQueryParameter('contact', contactId);
    }

    if (personId) {
      url += this.getQueryParameter('person', personId);
    }

    if (appointmentId) {
      url += this.getQueryParameter('appointment', appointmentId);
    }

    if (saleId) {
      url += this.getQueryParameter('sale', saleId);
    }

    if (selectionId) {
      url += this.getQueryParameter('selection', selectionId);
    }

    if (projectId) {
      url += this.getQueryParameter('project', projectId);
    }

    return this.http.post(url, null, this.options).catch(this.onError);
  }

  getQueryParameter(name: string, value: number): string {
    return `&${name}Id=${value}`;
  }

  saveDocument(document: any): Observable<any> {
    return this.http
      .put(`${this.claims.webapi_url}/Document/default`,
      document,
      this.options)
      .catch(this.onError);
  }
}
