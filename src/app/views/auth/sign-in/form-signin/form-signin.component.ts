import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputAuthTextComponent } from '@form-control/input-auth-text/input-auth-text.component';
import { ngFormHelper } from '@helpers/index';
import { IForm, Login_DTO, FormControlOption } from '@interfaces/index';
import { AlertDisplayComponent } from '@layouts/shared/alert-display/alert-display.component';
import { LoadSpinnerComponent } from '@layouts/shared/load-spinner/load-spinner.component';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/core/services/api/auth/auth.service';
import { RxUserService } from 'src/app/core/services/state/rx-user.service';

@Component({
  selector: 'app-form-signin',
  standalone: true,
  imports: [CommonModule, InputAuthTextComponent, ReactiveFormsModule, LoadSpinnerComponent, AlertDisplayComponent],
  templateUrl: './form-signin.component.html'
})
export class FormSigninComponent {
    private readonly auth$ = inject(AuthService);
    private readonly rxUser$ = inject(RxUserService);
    private readonly router = inject(Router);
    private readonly fb = inject(FormBuilder);
    optionsSelect = signal<FormControlOption[]>([]);
    loadSpinner = signal(false);
    authError = signal(false);
    form: FormGroup;
    formClone: Login_DTO;
    formControls: IForm<Login_DTO> = {
        username: ['CrowDev'],
        password: ['12345'],
    }

    constructor() {
        this.form = this.fb.group(this.formControls);
        this.formClone = ngFormHelper.unboxProperties(this.formControls);
    }

    submit() {
        if(this.form.valid) {
            this.loadSpinner.set(true);
            this.auth$.login(this.form.value).subscribe({
                next: (value) => {
                    this.rxUser$.dispachLogin(value);
                    this.reset();
                    timer(100).subscribe(() => this.router.navigate(['dashboard/panel/general']))
                }
            })
        }
    }

    reset() {
        this.form.reset(this.formClone);
        this.loadSpinner.set(false);
    }
}
