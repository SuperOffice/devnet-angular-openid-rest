import { Component, OnInit } from '@angular/core';
import { Claims } from '../model'
import { AuthService, ProjectService } from '../services';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects;
  public claims;
  public errorMessage;

  constructor(private projectSvc: ProjectService, private authService: AuthService) { }

  ngOnInit() {
    this.claims = this.authService.getClaims();

    this.projectSvc.getAllProjects()
    .subscribe( projectData => {
      this.projects = projectData;
    }, error => {
      this.errorMessage = error;
    });
  }

}
