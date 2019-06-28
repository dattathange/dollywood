import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LoginService} from '../../globalservices/login/login.service';
import {Navigationshared} from '../../globalservices/sharedservices/navigationshared.service'
import {Router} from '@angular/router'
import {Loginshared} from '../../globalservices/sharedservices/loginshared.service'
import { Navigation } from 'selenium-webdriver';
import { UserDetails } from '../../models/userdetails';
import {GlobalNavData} from '../../utilities/globalNavigationData';
import {AccountService} from '../../globalservices/account/account.service'
import { NG_VALIDATORS,Validator,
  Validators,AbstractControl,ValidatorFn } from '@angular/forms';

import { 
  AuthService,
  FacebookLoginProvider, 
  GoogleLoginProvider,
  LinkedinLoginProvider,
  SocialUser
} from 'ng4-social-login';

import {LoaderService} from '../../globalservices/sharedservices/loader.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  socialUserObject: SocialUser;
  mobileNo: string = "";
  eMail: string = "";
  sessionId: string = "";
  otp: string = ""
  loggedIn: boolean = false;
  errorMessage: string = "";
  showModal = true;
  inCorrectOtp = false;
  nothingLoading = true;
  mobileClass = "floating-label";
  emailClass = "floating-label-email";
 
  @Output() public onLogin = new EventEmitter<any>();
   
  constructor(private loginService: LoginService, private router: Router, 
    private navigationSharedService: Navigationshared,
    private loginSharedService: Loginshared,
    private authService: AuthService,
    private globalNavData: GlobalNavData,
  private accountService: AccountService,
  private loaderService: LoaderService) { 

    this.clearPreviousSession();
    //  this.globalNavData.setAuthService(this.authService);
      this.authService.authState.subscribe((user) => {
        this.socialUserObject = user;
        this.loggedIn = (user != null);
        if(user != null && user.email != undefined) {
          this.loginService.socialLogin("",user.email).
          subscribe(result => {
            if (result.status != undefined && result.status == true)
            {
                //console.log("verify OTPP");
                this.loggedIn = true;
                sessionStorage.setItem('ud', result.user_id);
                this.updateUserProfile(user, result.user_id);
                this.router.navigate(['']);
                this.loginSharedService.receiveUserLoggedIn("user logged in");
            }
        })
        }
      });
  }

  clearPreviousSession () {
    //console.log("signout");
    //sessionStorage.clear();
    //remove the key
    delete sessionStorage.ud;
    // in case it's a social login
    let authService: AuthService = this.authService;
    if(authService != undefined && authService != null)
      authService.signOut();
    this.loggedIn = false;
  }

  ngOnInit() {
    this.navigationSharedService.receiveNavigationChanged('login');
  }

  sendOtp() {
    this.errorMessage = "";
    
    if((this.mobileNo == undefined || this.mobileNo.length == 0)
    && (this.eMail == undefined || this.eMail.length == 0)) {
      this.errorMessage = "please enter either your mobile no or email Id";
      return;
    }

    this.showModal = true;
    this.nothingLoading = false;
    this.loginService.sendOtp(this.mobileNo,this.eMail)
    .subscribe(result=>{
      //console.log(result);
      if(this.mobileNo != undefined && this.mobileNo.length > 0)
        this.sessionId = result.details;
      else
      this.sessionId = "0";
      this.nothingLoading = true;
    }
    );
  }

  varifyOTP() {
    this.nothingLoading = false;
    this.loginService.verifyOtp(this.sessionId,this.otp, this.mobileNo, this.eMail)
        .subscribe(result => {
            
            //console.log(result);
        if (result.status != undefined && result.status == true)
        {
            //console.log("verify OTPP");
            this.loggedIn = true;
            sessionStorage.setItem('isLoggedIn', 'true');
            this.loginService.setIsLoggedIn(true);
            sessionStorage.setItem('ud', result.user_id);
            //if user is comes from video detail page then ...again goes back to video detail page. -sana request
            let asset_id = sessionStorage.getItem('asset_id');
            if (asset_id !== undefined && asset_id != null) {
                let asset_path = sessionStorage.getItem('asset_path');
                this.router.navigate(['video/'+ asset_path + '/' + asset_id ]);
            } else {
                this.router.navigate(['']);
            }
            
            this.loginSharedService.receiveUserLoggedIn("user logged in");
            //let _userDetails = new UserDetails();
            //_userDetails.userId = result.user_id;
        }
        else if(result.status == false && result.msg.toLowerCase().indexOf("mismatch") != -1) {
          this.inCorrectOtp = true;
        }
        this.nothingLoading = true;
    }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIN(): void {
    this.authService.signIn(LinkedinLoginProvider.PROVIDER_ID);
  }

  updateUserProfile(user: SocialUser, userId: any) {
    let updateProfileData: any = {
      "uid":userId,
      "fullname":user.name
    };
    this.nothingLoading = false;
      this.accountService.updateUserProfile(updateProfileData)
        .subscribe(
          result => {
           //   console.log(result);
              if(result.status != undefined && result.status == true)
              {
                this.errorMessage = "Profile updated successfully";
              }
              else {
                this.errorMessage = "Some problem while updating the profile, please try again";
              }
              this.nothingLoading = true;
          }
      );

  }

  floatLabel(key) {
    this.emailClass = 'floating-label-email';
    this.mobileClass = 'floating-label'
    switch(key) {
      case 'email':
        this.emailClass = 'floating-label-email floating-label-focus';
        break;
      case 'mobile':
      this.mobileClass = 'floating-label floating-label-focus';
        break;
    }

    'floating-label-focus'
  }

  
}
