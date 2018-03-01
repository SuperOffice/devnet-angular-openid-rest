import { Component, OnInit } from '@angular/core';
import { AuthService, Claims } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  private projects;
  private claims;
  private errorMessage;

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
