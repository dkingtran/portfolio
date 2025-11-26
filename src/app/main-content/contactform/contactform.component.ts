import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss'
})
export class ContactformComponent {

  http = inject(HttpClient);

  constructor(public languageService: LanguageService) { }

  contactdata = {
    name: '',
    email: '',
    message: ''
  }

  acceptPrivacy = false;
  formSuccess = false;
  submitted = false;
  touched: { [key: string]: boolean } = {};
  errors: { [key: string]: string } = {};
  tempValues: { [key: string]: string } = {};

  // Mail test toggle and post configuration (mentor pattern)
  mailTest = true;

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onBlur(field: string) {
    this.touched[field] = true;
    this.validateField(field);
  }

  onFocus(field: string) {
    this.touched[field] = false;
    this.errors[field] = '';
    if (this.tempValues[field]) {
      this.restoreFieldValue(field);
    }
  }

  storeAndClearField(field: string) {
    this.tempValues[field] = this.getFieldValue(field);
    this.setFieldValue(field, '');
  }

  restoreFieldValue(field: string) {
    this.setFieldValue(field, this.tempValues[field]);
    this.tempValues[field] = '';
  }

  getFieldValue(field: string): string {
    switch (field) {
      case 'name': return this.contactdata.name;
      case 'email': return this.contactdata.email;
      case 'message': return this.contactdata.message;
      default: return '';
    }
  }

  setFieldValue(field: string, value: string) {
    switch (field) {
      case 'name': this.contactdata.name = value; break;
      case 'email': this.contactdata.email = value; break;
      case 'message': this.contactdata.message = value; break;
    }
  }

  validateField(field: string) {
    if (!this.touched[field]) return;
    switch (field) {
      case 'name': this.validateName(); break;
      case 'email': this.validateEmail(); break;
      case 'message': this.validateMessage(); break;
    }
  }

  validateName() {
    if (!this.contactdata.name || this.contactdata.name.trim().length === 0) {
      this.errors['name'] = this.languageService.translate('contact.errorNameMissing');
    } else if (!this.isValidName(this.contactdata.name)) {
      this.errors['name'] = this.languageService.translate('contact.errorNameFormat');
    } else {
      this.errors['name'] = '';
    }
  }

  validateEmail() {
    if (!this.contactdata.email || this.contactdata.email.trim().length === 0) {
      this.errors['email'] = this.languageService.translate('contact.errorEmailMissing');
    } else if (!this.isValidEmail(this.contactdata.email)) {
      this.errors['email'] = this.languageService.translate('contact.errorEmailInvalid');
    } else {
      this.errors['email'] = '';
    }
  }

  validateMessage() {
    if (this.contactdata.message && this.contactdata.message.trim().length > 0 && this.contactdata.message.trim().length < 10) {
      this.errors['message'] = this.languageService.translate('contact.errorMessageTooShort');
    } else {
      this.errors['message'] = '';
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  isValidName(name: string): boolean {
    const trimmedName = name.trim();
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
    return words.length >= 2;
  }

  hasError(field: string): boolean {
    return this.touched[field] && !!this.errors[field];
  }

  getPlaceholder(field: string, defaultPlaceholder: string): string {
    return this.hasError(field) ? this.errors[field] : defaultPlaceholder;
  }

  /* ORIGINAL onSubmit kept for reference (commented out)
  onSubmit() {
    this.submitted = true;
    this.validateAllFields();

    if (this.isFormValid()) {
      // Log the submitted data before the form is reset
      console.log({ ...this.contactdata });
      this.handleSuccessfulSubmit();
    } else {
      this.formSuccess = false;
      // Log current values to help debugging when the form is invalid
      console.log({ ...this.contactdata });
    }

  }
  */

  // New onSubmit that accepts the template-driven form and optionally sends a real HTTP POST
  onSubmit(ngForm: NgForm) {
    // Keep existing validation behaviour
    this.submitted = true;
    this.validateAllFields();

    // If the form is valid, either send the mail (when mailTest === false)
    // or run the local test flow (when mailTest === true)
    if (ngForm.submitted && this.isFormValid() && !this.mailTest) {
      // Attempt to post the payload to the configured endpoint
      this.http.post(this.post.endPoint, this.post.body(this.contactdata), this.post.options as any)
        .subscribe({
          next: (response) => {
            console.log('mail send response', response);
            // show success modal and reset local state
            this.handleSuccessfulSubmit();
            ngForm.resetForm();
          },
          error: (error) => {
            console.error('mail send error', error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && this.isFormValid() && this.mailTest) {
      // Mail test mode — do not send HTTP request, show success and reset
      console.log('mailTest enabled — skipping actual HTTP request', { ...this.contactdata });
      this.handleSuccessfulSubmit();
      ngForm.resetForm();
    } else {
      // invalid form — keep existing behaviour: mark as not-success and log
      this.formSuccess = false;
      console.log({ ...this.contactdata });
    }
  }

  validateAllFields() {
    this.touched['name'] = true;
    this.touched['email'] = true;
    this.touched['message'] = true;
    this.validateField('name');
    this.validateField('email');
    this.validateField('message');
  }

  isFormValid(): boolean {
    const validName = !!(this.contactdata.name && this.contactdata.name.trim().length > 0 && this.isValidName(this.contactdata.name));
    const validEmail = !!(this.contactdata.email && this.contactdata.email.trim().length > 0 && this.isValidEmail(this.contactdata.email));
    const validMessage = !this.contactdata.message || this.contactdata.message.trim().length >= 10;
    const validPrivacy = this.acceptPrivacy === true;
    return validName && validEmail && validMessage && validPrivacy;
  }

  handleSuccessfulSubmit() {
    this.formSuccess = true;
    this.resetForm();
    setTimeout(() => {
      this.formSuccess = false;
    }, 3000);
  }

  resetForm() {
    this.contactdata.name = '';
    this.contactdata.email = '';
    this.contactdata.message = '';
    this.acceptPrivacy = false;
    this.submitted = false;
    this.touched = {};
    this.errors = {};
  }

}
