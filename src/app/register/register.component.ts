import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from "src/app/service/user.service";
import { AlertService } from "src/app/service/alert.service";

// import { AlertService, UserService } from '../../_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    showOTP: boolean;
    pageCount: number = 1;
    registerForm: FormGroup;
    loading = false;
    submitted = false;

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
            password: ['', [Validators.required, Validators.minLength(3)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
            mobileOtp : ['']
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        // this.userService.register(this.registerForm.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }

    onNextClick() {
        this.pageCount += 1;
    }

    onPreviousClick() {
        this.pageCount -= 1;
    }

    onChangeMobileNo() {
        console.log(this.registerForm.get('mobileNo').value.length);
        this.registerForm.get('mobileNo').value.length === 10 ? this.showOTP = true : this.showOTP = false;
        // if (this.registerForm.get('mobileNo').value.length && this.registerForm.get('mobileNo').value.length < 10) {
        //     this.validMobileNo = 
        // }
    }
}
