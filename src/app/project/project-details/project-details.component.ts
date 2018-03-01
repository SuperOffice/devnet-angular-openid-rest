import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { PersonService } from '../../services/person.service';
import { ContactService } from '../../services/contact.service';
import { ListService } from '../../services/list.service';
import { UdefService } from '../../services/udef.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactListComponent } from '../../contact/contact-list.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  private selectedProjectId;
  private selectedProject;
  private errorMessage;
  private projectTypeList;
  private projectStatusList;
  private udefDefinitions;
  private udefNames;
  private people;
  private contacts;

  constructor(private projectSvc: ProjectService, private listSvc: ListService, private contactSvc: ContactService,
    private personSvc: PersonService, private udefSvc: UdefService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.listSvc.getProjectTypeList().subscribe(projectTypes => { this.projectTypeList = projectTypes; });
    this.listSvc.getProjectStatusList().subscribe(projectStatusList => { this.projectStatusList = projectStatusList; });
    this.getUserDefinedFieldTypes();

    const contactId = this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.selectedProjectId = params.get('id');
        if (this.selectedProjectId > 0) {
          this.projectSvc.getProject(this.selectedProjectId)
          .subscribe(project => {
             this.selectedProject = project;
             this.setContactAndPersonFields(this.selectedProject);
          });
        } else {
          this.projectSvc.getProject(0)
          .subscribe(project => {
            this.selectedProject = project;
            this.setContactAndPersonFields(this.selectedProject);
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

  setContactAndPersonFields(entitiy) {
    entitiy.Contact = { ContactId: 0 };
    entitiy.Person =  { PersonId:  0 };
  }

  saveProject() {
    this.projectSvc.saveProject(this.selectedProject)
    .subscribe(project => {
      this.selectedProject = project;
    }, error => {
      this.errorMessage = error;
    }, () => {
      // saved...
      this.goBack();
    });
  }

  deleteProject(projectId) {
    this.projectSvc.deleteProject(projectId)
    .subscribe(project => {
      const ok = project;
    }, error => {
      this.errorMessage = error;
    }, () => {
      this.goBack();
    });
  }

  onProjectTypeSelected(eventData) {
    const data = event;
  }

  onProjectStatusSelected(eventData) {
    const data = event;
  }

  getUserDefinedFieldTypes() {
    this.udefSvc.getAllProjectUdefFields().subscribe ( udefs => {
      this.udefDefinitions = udefs;
      this.udefNames = this.udefSvc.fieldDataTypesByType;
    });
  }

  goBack() {
    this.router.navigateByUrl('/project');
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
      this.selectedProject.Contact.ContactId = contactId;

      this.getAllPeople(contactId);

      this.selectedProject.Person = { PersonId: 0 };
  }

  personChanged(personId) {
      this.selectedProject.Person.PersonId = personId;
  }
}
