import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss'
})
export class ContactformComponent {

  name = '';
  email = '';
  message = '';
  acceptPrivacy = false;
  formSuccess = false;
  submitted = false;

  onSubmit() {
    this.submitted = true;
    // basic validation: name, email and privacy required, message minlength 10
    const validName = this.name && this.name.trim().length > 0;
    const validEmail = this.email && this.email.trim().length > 0;
    const validMessage = !this.message || this.message.trim().length >= 10;
    const validPrivacy = this.acceptPrivacy === true;

    if (validName && validEmail && validMessage && validPrivacy) {
      // simulate send
      this.formSuccess = true;
      // reset form fields (optional)
      this.name = '';
      this.email = '';
      this.message = '';
      this.acceptPrivacy = false;
      this.submitted = false;
    } else {
      this.formSuccess = false;
    }
  }

}
