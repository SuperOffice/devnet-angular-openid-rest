import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { AuthService } from "../services/auth.service";
import { Claims } from "../model";

@Injectable()
export class FileUploadService {
  options: any;
  claims: Claims;

  constructor(private http: HttpClient, private authSvc: AuthService) {
    let headerFields = new HttpHeaders({
      Authorization: this.authSvc.getAuthorizationHeaderValue(),
      'Accept': 'application/json',
      'Content-Type': 'application/octet-stream',
      'Accept-Language': '*'
    });
    //headerFields.append('Content-Type', 'multipart/form-data')

    this.options = {
      headers: headerFields
    };

    this.claims = this.authSvc.getClaims();
  }

  putFile(documentId: number, fileToUpload: File): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    return this.http
      .put(
        `${this.claims.webapi_url}/Document/${documentId}/Content`,
        formData,
        this.options
      )
      .catch(this.onError);
  }

  onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
