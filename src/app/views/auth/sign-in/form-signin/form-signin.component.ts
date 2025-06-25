import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAuthTextComponent } from '@form-control/input-auth-text/input-auth-text.component';
import { InputAuthSelectComponent } from '@form-control/input-auth-select/input-auth-select.component';
import { OptionsForm } from '@interfaces/index';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { LoadSpinnerComponent } from '@layouts/shared/load-spinner/load-spinner.component';
import { Router } from '@angular/router';
import { AlertDisplayComponent } from '@layouts/shared/alert-display/alert-display.component';

@Component({
  selector: 'app-form-signin',
  standalone: true,
  imports: [CommonModule, InputAuthTextComponent, InputAuthSelectComponent, ReactiveFormsModule, LoadSpinnerComponent, AlertDisplayComponent],
  templateUrl: './form-signin.component.html'
})
export class FormSigninComponent {
    optionsSelect = signal<OptionsForm[]>([]);
    loadSpinner = signal(false);
    authError = signal(false);
    form = this.formBuilder.group({
        user: ['', Validators.required],
        password: ['', Validators.required]
    })

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ){
        this.optionsSelect.set([
        {
            name: 'Option uno',
            value: 1
        },
        {
            name: 'Option dos',
            value: 2
        }
        ])
    }

    get isValid() {
        return !this.form.valid;
    }
    submit(){
        this.submitFake();
    }

    submitFake(){
        if(!this.isValid){
            this.loadSpinner.set(true);
            timer(1500).subscribe(() => {
                this.loadSpinner.set(false);
                if(this.form.get('user')?.value === 'Admin' && this.form.get('password')?.value === '12345'){
                    this.router.navigate(['dashboard/panel/general'])
                } else {
                    this.authError.set(true);
                    timer(5000).subscribe(() => this.authError.set(false))
                }
            })
        }
    }

    reset(){
        this.form.patchValue({
            user: '',
            password: ''
        });
    }
}
