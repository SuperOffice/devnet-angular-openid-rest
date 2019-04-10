
import {catchError} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { SoBaseService } from './sobase.service';

// import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class ProjectService extends SoBaseService {

  constructor(injector: Injector) {
    super('Project', injector);
   }

   getAllProjects(): Observable<any> {
    return this.http
      .get<any>(
        `${
          this.claims.webapi_url
        }/project?$select=projectId,name,description&$top=20`,
        this.options
      )
      .pipe(catchError(this.onError));
  }

  /** Gets or creates a project depended on projectId. 0 will create a new project */
  getProject(projectId): Observable<any> {
    return this.get(projectId);
  }

  deleteProject(projectId) {
    return this.delete(projectId);
  }

  saveProject(project) {
    return this.save(project);
  }
}
