import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { first } from 'rxjs/operators';
import { AuthenticationService } from "app/service/authentication.service";
import { AlertService } from "app/service/alert.service";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from 'firebase';
import { UtilService } from "app/service/util.service";
import { NotificationService } from "ng2-notify-popup";
import {AppConstant} from '../../app/app-constant'; 


// import { AuthenticationService } from '../../service/';

@Component({
    selector : 'app-login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  confirmResult: firebase.auth.ConfirmationResult;
  otpSentSuccessfully: boolean;
  // windowRef: any;
  windowRef: firebase.auth.RecaptchaVerifier
  loginForm: FormGroup;
  // showPage: number = 1;
  mobileLength = AppConstant.mobileNoLength;
    mobile;
    mobileOtp;
    recaptchaVerifier;
    showMobileOtp = false;
    @Input() id: string;
    
    constructor(public afAuth: AngularFireAuth,
                private _fb: FormBuilder,
                private _util: UtilService,
                private _notify: NotificationService) {}

    ngOnInit() {
      this.loginForm = this.createLoginForm();
      this.windowRef = new firebase.auth.RecaptchaVerifier('otp-button', {
        'size': 'invisible',
        'callback': ((response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // this.onContinueClick();
          
        })
      });
      firebase.auth().useDeviceLanguage();
      
    }

    createLoginForm() {
      return this._fb.group({
        mobile: '',
        mobileOtp: ''
      })
    }

    onContinueClick() {
      if (this.validatePhoneNumber()) {

        var phoneNumber = this.getFormattedMobileNo();
        var appVerifier = this.windowRef;
        this.showMobileOtp = true;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // this._notify.show('OTP sent successfully on entered mobile number', { position:'bottom', duration:'2000', type: 'success' });  
            console.log(confirmationResult);
           

            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            this.confirmResult = confirmationResult;
            console.log(this.windowRef);
          }).catch((error) => {
            console.log(error);
            // this._notify.show('Error while sending OTP to given mobile number', { position:'bottom', duration:'2000', type: 'error' });
            // Error; SMS not sent
            // ...
          });
      } else {
        alert('Enter valid phone number');
        // this._notify.show('Please enter valid Mobile number of 10 digits', { position:'bottom', duration:'2000', type: 'success' });
      }

    }

    onVerifyClick() {
      var code = this.loginForm.get('mobileOtp').value;
      this.confirmResult.confirm(code).then(function (result) {
        // User signed in successfully.
        var user = result.user;
        console.log(user);
        localStorage.setItem('uid', user.uid);
        console.log('uid', localStorage.getItem('uid'));
        // ...
      }).catch(function (error) {
        // User couldn't sign in (bad verification code?)
        // ...
      });
    }

    getFormattedMobileNo() {
      var phoneNumber = this.loginForm.get('mobile').value
      const formattedMobileNo = '+91' + phoneNumber;
      return formattedMobileNo;
    }
    
    validatePhoneNumber() {
      if (this.loginForm.get('mobile').value.length === 10) {
        return true;
      } 
      return false;
    }

    isOTPVisible(){
      return this.showMobileOtp;
    }

}