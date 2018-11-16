import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from "src/app/service/user.service";
import { AlertService } from "src/app/service/alert.service";
import { AppConstant } from '../app-constant';

// import { AlertService, UserService } from '../../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    validMobileNo: boolean;
    showOTP: boolean;
    pageCount: number = 1;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    validInputs = {
        firstName : true,
        lastName : true,
        username : true,
        password : true,
        confirmPassword : true,
        mobileNo : true
    };
    mobileLength = AppConstant.mobileNoLength;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            mobileNo: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            mobileOtp : ['']
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.registerForm.value);
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.registerUser(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    onNextClick() {
        this.pageCount += 1;
    }

    onPreviousClick() {
        this.pageCount -= 1;
    }

    isDisabled() {
        const formControl = this.registerForm;
        if (this.pageCount === 1) {
            return !(formControl.get('firstName').valid && formControl.get('lastName').valid &&
                    this.validInputs['firstName'] && this.validInputs['lastName']) ;
        } else if (this.pageCount === 2) {
            return !(formControl.get('username').valid && formControl.get('password').valid && formControl.get('confirmPassword').valid &&
                    this.validInputs['username'] && this.validInputs['password'] && this.validInputs['confirmPassword']);
        }
    }

    onChangeInput(event, length, name) {
        console.log(event);
        if (name !== 'confirmPassword') {
            (event.target.value.length < length) ? this.validInputs[name] = false : this.validInputs[name] = true;
        } else if (name === 'confirmPassword') {
            (this.registerForm.get('password').value !== event.target.value) ? this.validInputs[name] = false : this.validInputs[name] = true;
        }
    }

    isSubmitDisabled() {
        return !(this.registerForm.get('mobileNo').valid && this.validInputs['mobileNo']);
    }



}
