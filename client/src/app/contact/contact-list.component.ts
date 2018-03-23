import { Component, OnInit } from '@angular/core';
import { AuthService, ContactService } from '../services';
import { Claims } from '../model'
import { Contact } from './contact.interface';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  selectedContactId;
  contacts = [];

  public errorMessage;

  constructor(private contactSvc: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedContactId = params.get('id');
    });

    this.contactSvc.getContacts()
    .subscribe(contactData => {
      this.contacts = contactData;
    }, error => {
      this.errorMessage = error;
    });
  }

  onSelect(contactId) {
    this.router.navigate([contactId], {relativeTo: this.route});
    // this.router.navigate(['/contact/contact-detail', contactId]);
  }

  isSelected(contactId) {
    return contactId === this.selectedContactId;
  }

}
