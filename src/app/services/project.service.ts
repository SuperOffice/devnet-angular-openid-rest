import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Claims } from '../model';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from 'selenium-webdriver/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProjectService {

  private claims: Claims;
  private options;

  private queryAllProjects = {
    'ProviderName': 'FindProject',
    'Columns': 'projectId, name, description',
    'Restrictions': 'projectId > 0',
    'Entities': 'project',
    'Page': 0,
    'PageSize': 20
  };

  constructor(private http: HttpClient, private authService: AuthService) {
    this.options = {
      headers: new HttpHeaders({ 'Authorization': this.authService.getAuthorizationHeaderValue() })
    };

    this.claims = this.authService.getClaims();
   }

   getAllProjects(): Observable<any> {
    return this.http.post<any>(
      this.claims.webapi_url + '/Agents/Archive/GetArchiveListByColumns2',
      this.queryAllProjects, this.options).catch(this.onError);
  }

  /** Gets or creates a project depended on projectId. 0 will create a new project */
  getProject(projectId): Observable<any> {
    if (projectId === 0) {
      return this.http.get<any>(this.claims.webapi_url + '/Project/default', this.options)
      .catch(this.onError);
     } else {
      return this.http.get<any>(this.claims.webapi_url + '/Project/' + projectId, this.options)
      .catch(this.onError);
     }
  }

  deleteProject(projectId) {
    return this.http.delete(this.claims.webapi_url + '/Project/' + projectId, this.options)
    .catch(this.onError);
  }

  saveProject(project) {
    if (project.ProjectId > 0) {
      return this.http.put<any>(this.claims.webapi_url + '/Project/' + project.ProjectId, project,
       this.options)
       .catch(this.onError);
     } else {
       return this.http.post<any>(this.claims.webapi_url + '/Project', project,
       this.options)
      .catch(this.onError);
     }
  }

  onError(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
