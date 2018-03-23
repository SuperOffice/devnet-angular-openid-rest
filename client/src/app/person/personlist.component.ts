import { Component, OnInit } from "@angular/core";
import { PersonService } from "../services/person.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../services";
import { Claims } from "../model";
import { Route } from "@angular/router/src/config";

@Component({
  selector: "app-personlist",
  templateUrl: "./personlist.component.html",
  styleUrls: ["./personlist.component.css"]
})
export class PersonlistComponent implements OnInit {
  selectedContactId;
  selectedPersonId;
  selectedPerson;
  people;

  public errorMessage;

  constructor(
    private personSvc: PersonService,
    private authSvc: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedContactId = params.get("id");

      this.loadAllPeople();
    });
  }

  loadAllPeople() {
    this.personSvc.getAllPerson(this.selectedContactId).subscribe(
      personData => {
        this.people = personData;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  onSelect(personId) {
    this.selectedPersonId = personId;
    this.personSvc.getPerson(this.selectedPersonId).subscribe(
      person => {
        this.selectedPerson = person;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  savePerson() {
    this.personSvc.savePerson(this.selectedPerson).subscribe(
      person => {
        this.loadAllPeople();
        this.selectedPerson = person;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  deletePerson(personId) {
    this.personSvc.deletePerson(personId).subscribe(
      result => {
        this.loadAllPeople();
        this.selectedPerson = null;
      },
      error => {
        this.errorMessage = error;
      },
      () => {
        alert("Person Deleted");
      }
    );
  }

  onCreate() {
    this.selectedPersonId = 0;
    this.personSvc.getPerson(this.selectedPersonId).subscribe(
      person => {
        this.selectedPerson = person;
        this.selectedPerson.Contact = { ContactId: this.selectedContactId };
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  isSelected(personId) {
    if (personId === undefined || this.selectedPersonId === undefined) {
      return false;
    }
    // console.log('SelectedPersonId: ' + this.selectedPersonId + ', PassedInPersonId: ' + personId);
    return +personId === +this.selectedPersonId;
  }

  goBack() {
    this.router.navigate(["/contacts", this.selectedContactId], {
      relativeTo: this.route
    });
  }

  getSaveTitle(): string {
    return this.selectedPersonId > 0
      ? `PUT api/v1/Person/${this.selectedPersonId} (person json in the body)`
      : `POST api/v1/Person (person json in the body)`;
  }

  getDeleteTitle(): string {
    return this.selectedPersonId > 0
      ? `DELETE api/v1/Person/${this.selectedPersonId}`
      : `Should never see this...`;
  }
}
