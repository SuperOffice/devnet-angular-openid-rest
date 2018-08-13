import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { SoBaseService } from './sobase.service';

// import { HttpResponse } from 'selenium-webdriver/http';

@Injectable()
export class ProjectService extends SoBaseService {

  private queryAllProjects = {
    'ProviderName': 'FindProject',
    'Columns': 'projectId, name, description',
    'Restrictions': 'projectId > 0',
    'Entities': 'project',
    'Page': 0,
    'PageSize': 20
  };

  constructor(injector: Injector) {
    super('Project', injector);
   }

   getAllProjects(): Observable<any> {
    return this.http.post<any>(
      this.claims.webapi_url + '/Agents/Archive/GetArchiveListByColumns2',
      this.queryAllProjects, this.options).catch(this.onError);
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
