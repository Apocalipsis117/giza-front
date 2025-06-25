import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BladeAuthFormComponent } from '@layouts/auth/blade-auth-form/blade-auth-form.component';
import { FormSigninComponent } from './form-signin/form-signin.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormSigninComponent, BladeAuthFormComponent],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {

}
