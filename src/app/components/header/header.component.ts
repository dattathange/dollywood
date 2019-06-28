import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { Loginshared} from '../../globalservices/sharedservices/loginshared.service';
import {Router} from '@angular/router'
import {GlobalNavData} from '../../utilities/globalNavigationData'

import { UserDetails } from '../../models/userdetails';
import { 
  AuthService,
  FacebookLoginProvider, 
  GoogleLoginProvider,
  LinkedinLoginProvider,
  SocialUser
} from 'ng4-social-login';
import { LoginService } from '../../globalservices/login/login.service';


declare var extUtilityObject: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  //styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    // @HostListener('')
    // @HostListener('document:click', ['$event'])
    // clickout(event) {
    //   console.log("click outside",event);
    //   if(!event.target.classList.contains("language-drp")) {
    //     this.langDrpOpen = false;
    //   }

    // }
    profileItems:any[] = [{'url':'/user/login','displayText':'login'}];
    subscription: Subscription;
    isUserLoggedIn: boolean = false;
    logOutButtonClicked = false;
    langDrpOpen: boolean = false;

  constructor(private loginService: LoginService, private loginSharedService: Loginshared, private authService: AuthService,
  private router: Router,
  private globalNavData: GlobalNavData) { 
    this.subscription = loginSharedService.sendUserLoggedIn$.subscribe(
        mission => {
            //console.log("user logged in");
            let uid = sessionStorage.getItem('ud');
            //console.log(uid);
            if (uid !== undefined && uid != null) {
                this.isUserLoggedIn = true;
                //this.bindUserMenu();
            }
    });
  }


    ngOnInit() {

      extUtilityObject.initializeDropDowns();
      let uid = sessionStorage.getItem('ud');
      
        if (uid !== undefined && uid != null) {
            this.isUserLoggedIn = true;
            //this.bindUserMenu();
        }
        else
        {
            this.isUserLoggedIn = false;
        }

        //console.log("this.isUserLoggedIn : " + this.isUserLoggedIn);

        //To calculate minimum height of page
        /*const height = this.targetElement.nativeElement.offsetHeight;

        // Here you can use the height!
        console.log("header_height");
        console.log(height);*/
  }

  bindUserMenu() {
      this.profileItems = [];
      this.profileItems.push({ "url": "/user/favorites", "displayText": "Favourites" });
      this.profileItems.push({ "url": "/user/watchlist", "displayText": "Watch List" });
      this.profileItems.push({ "url": "/user/account","displayText":"My Account"});
      this.profileItems.push({ "url": "", "displayText": "Sign Out" });
    
  }

  logOutClicked() {
    this.logOutButtonClicked = true;
  }

  cancelLogout() {
    this.logOutButtonClicked = false;
  }

  confirmLogout() {
    this.logOutButtonClicked = false;
    this.signOut();
  }

  signOut() {
      //console.log("signout");
      sessionStorage.clear();
      // in case it's a social login
      let authService: AuthService = this.authService;
      if(authService != undefined && authService != null)
        authService.signOut();
      this.isUserLoggedIn = false;
      this.loginService.setIsLoggedIn(false);
      this.router.navigate(['/language']);
  }


}
