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
  // track per-field touch state so we can show errors on blur immediately
  touched: { [key: string]: boolean } = {};
  // track error state per field
  errors: { [key: string]: string } = {};
  // store original values before showing error
  tempValues: { [key: string]: string } = {};

  onBlur(field: string) {
    this.touched[field] = true;
    this.validateField(field);
    if (this.errors[field]) {
      this.storeAndClearField(field);
    }
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
      case 'name': return this.name;
      case 'email': return this.email;
      case 'message': return this.message;
      default: return '';
    }
  }

  setFieldValue(field: string, value: string) {
    switch (field) {
      case 'name': this.name = value; break;
      case 'email': this.email = value; break;
      case 'message': this.message = value; break;
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
    if (!this.name || this.name.trim().length === 0) {
      this.errors['name'] = 'Oops! It seems your name is missing.';
    } else if (!this.isValidName(this.name)) {
      this.errors['name'] = 'Please enter your first and last name.';
    } else {
      this.errors['name'] = '';
    }
  }

  validateEmail() {
    if (!this.email || this.email.trim().length === 0) {
      this.errors['email'] = 'Hoopla! Your email is required.';
    } else if (!this.isValidEmail(this.email)) {
      this.errors['email'] = 'Please enter a valid email address.';
    } else {
      this.errors['email'] = '';
    }
  }

  validateMessage() {
    if (this.message && this.message.trim().length > 0 && this.message.trim().length < 10) {
      this.errors['message'] = 'Please provide at least 10 characters.';
    } else {
      this.errors['message'] = '';
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

  onSubmit() {
    this.submitted = true;
    this.validateAllFields();

    if (this.isFormValid()) {
      this.handleSuccessfulSubmit();
    } else {
      this.formSuccess = false;
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
    const validName = !!(this.name && this.name.trim().length > 0 && this.isValidName(this.name));
    const validEmail = !!(this.email && this.email.trim().length > 0 && this.isValidEmail(this.email));
    const validMessage = !this.message || this.message.trim().length >= 10;
    const validPrivacy = this.acceptPrivacy === true;
    return validName && validEmail && validMessage && validPrivacy;
  }

  handleSuccessfulSubmit() {
    this.formSuccess = true;
    this.resetForm();
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.message = '';
    this.acceptPrivacy = false;
    this.submitted = false;
    this.touched = {};
    this.errors = {};
  }

}
