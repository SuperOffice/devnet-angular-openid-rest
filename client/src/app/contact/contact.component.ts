import { Component, OnInit } from '@angular/core';
import { AuthService, ContactService } from '../services';
import { Claims } from '../model'
import { Contact } from './contact.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contact: Contact;
  public claims: Claims;
  public errorMessage;
  private contacts;

  constructor(private contactSvc: ContactService, private authService: AuthService) { }

  ngOnInit() {
    this.claims = this.authService.getClaims();
    this.contactSvc.getMyContact()
    .subscribe(contactData => {
      this.contact = contactData;
    }, error => {
      this.errorMessage = error;
    });

    this.contactSvc.getContacts().subscribe( contactList => {
      this.contacts = contactList;
    }, error => {
      this.errorMessage = error;
    });
  }

  onSelect(contactData) {
    alert(contactData.contactId);
  }
}
