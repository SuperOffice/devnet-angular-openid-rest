import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../services/project.service";
import { PersonService } from "../../services/person.service";
import { ContactService } from "../../services/contact.service";
import { ListService } from "../../services/list.service";
import { UdefService } from "../../services/udef.service";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ContactListComponent } from "../../contact/contact-list.component";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.css"]
})
export class ProjectDetailsComponent implements OnInit {
  public selectedProjectId;
  public selectedProject;
  public errorMessage;
  public projectTypeList;
  public projectStatusList;
  public udefDefinitions;
  public udefNames;
  public people;
  public associates;

  constructor(
    private projectSvc: ProjectService,
    private listSvc: ListService,
    private contactSvc: ContactService,
    private personSvc: PersonService,
    private udefSvc: UdefService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listSvc.getProjectTypeList().subscribe(projectTypes => {
      this.projectTypeList = projectTypes;
    });
    this.listSvc.getProjectStatusList().subscribe(projectStatusList => {
      this.projectStatusList = projectStatusList;
    });
    this.getUserDefinedFieldTypes();

    const contactId = this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedProjectId = params.get("id");
      if (this.selectedProjectId > 0) {
        this.projectSvc
          .getProject(this.selectedProjectId)
          .subscribe(project => {
            this.selectedProject = project;
            this.setContactAndPersonFields();
          });
      } else {
        this.projectSvc.getProject(0).subscribe(project => {
          this.selectedProject = project;
          this.setContactAndPersonFields();
        });
      }
    });
  }

  setContactAndPersonFields() {
    if (!this.selectedProject.Associate) {
      this.selectedProject.Associate = { AssociateId: 0 };
    } else {
      this.personSvc.getAllAssociates().subscribe(associateData => {
        this.associates = associateData.value;
      });
    }
  }

  saveProject() {
    this.projectSvc.saveProject(this.selectedProject).subscribe(
      project => {
        this.selectedProject = project;
      },
      error => {
        this.errorMessage = error;
      },
      () => {
        // saved...
        this.goBack();
      }
    );
  }

  deleteProject(projectId) {
    this.projectSvc.deleteProject(projectId).subscribe(
      project => {
        const ok = project;
      },
      error => {
        this.errorMessage = error;
      },
      () => {
        this.goBack();
      }
    );
  }

  onProjectTypeSelected(eventData) {
    const data = event;
  }

  onProjectStatusSelected(eventData) {
    const data = event;
  }

  goBack() {
    this.router.navigateByUrl("/project");
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

  associateChanged(associateId) {
    this.selectedProject.Associate.AssociateId = associateId;
  }

  getUserDefinedFieldTypes() {
    this.udefSvc.getAllProjectUdefFields().subscribe(udefs => {
      this.udefDefinitions = udefs;
    });
  }

  getUdefLabelByProgId(progId: string): string {
    for (let udef of this.udefDefinitions) {
      if (udef.ProgId === progId) {
        return udef.FieldLabel;
      }
    }
    return "";
  }
}
