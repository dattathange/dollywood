import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from './globalservices/navigation/navigation.service';
import { NavigationModel } from './models/navigation';
import { Navigationshared} from './globalservices/sharedservices/navigationshared.service'
import { Loginshared} from './globalservices/sharedservices/loginshared.service'
import {ActivatedRoute, Router, RouterLink, Event   } from '@angular/router'
import {
    SocialLoginModule, 
    AuthServiceConfig,
    GoogleLoginProvider, 
    FacebookLoginProvider, 
    LinkedinLoginProvider,
    AuthService
} from 'ng4-social-login';
import {Title} from '@angular/platform-browser'
import { LoaderService } from './globalservices/sharedservices/loader.service';
import { LoginService } from './globalservices/login/login.service';
//import './../assets/js/custom.js'

declare var extUtilityObject: any;

const CONFIG = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('93277275564-k5p2a6vk3rsf566bgnbkt4kruhedi6pf.apps.googleusercontent.com')
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('202382740333722')
    }
  ]);

export function provideConfig() {
    return CONFIG;
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        //"../node_modules/bootstrap/scss/bootstrap.scss",
        //"../assets/css/style.scss"
    ],
    providers: [Navigationshared, Loginshared, AuthService, {
        provide: AuthServiceConfig,
        useFactory: provideConfig
    }]
})
export class AppComponent implements OnInit {
    private navModel: NavigationModel;
    contentLoaded: boolean = false;
    isLoggedIn: any;
    constructor(private loginService: LoginService, private _navigation: NavigationService, private navigationSharedService: Navigationshared,
    private loginSharedService: Loginshared, private titleService: Title, 
    private loaderService: LoaderService,
    private activatedRoute : ActivatedRoute,
    private router: Router) {
        navigationSharedService.receiveNavigationLoaded$.subscribe(
            message => {
          //    console.log('navigation loaded');
                this.navigationSharedService.sendNavigationLoaded(message);
                
            });
            
        loginSharedService.receiveUserLoggedIn$.subscribe(
            message => {
             //   console.log('user logged in');
                this.loginSharedService.sendUserLoggedIn(message);
            });

        navigationSharedService.routerDataLoaded$.subscribe(
            message => {
                this.titleService.setTitle(message);
            }
        )

        navigationSharedService.receiveNavigationChanged$.subscribe(message=> {
            this.navigationSharedService.sendNavigationChanged(message);
            extUtilityObject.applyRightArrowCss();
        })

        router.events.subscribe( (event: Event) => {
            extUtilityObject.applyRightArrowCss();
        })

        this.activatedRoute.url.subscribe(url =>{
           //extUtilityObject.applyRightArrowCss();
       });
    }

    ngOnInit() {
       
        //console.log("ngOnInit");
        //console.log(this._navigation.getNavigations()
        //    .subscribe(
        //        result => console.log(result)
        //        //error => this.errorMessage = <any>error
        //    ));
        //console.log("after navigations call");

        this.loaderService.status.subscribe((val: boolean) => {
            this.contentLoaded = val;

        });
        this.isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
        this.loginService.isLoggedInSubject.subscribe(res => {
            console.log(res);
            if(res) {
                this.isLoggedIn = res;
            }
            else {
                this.isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
            }
        });
        console.log(this.isLoggedIn);
        console.log(this.activatedRoute.url);
        console.log(this.router.url);
        if(this.isLoggedIn) {
            this.activatedRoute.url.subscribe(url =>{
                console.log(url);
                this.router.navigate([url]);
            });
        }
        else {
            this.router.navigate(['/language']);
        }
    }



    title = 'app';
}
