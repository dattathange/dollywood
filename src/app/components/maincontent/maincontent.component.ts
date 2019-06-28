import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Meta } from '@angular/platform-browser';

import { Navigationshared } from '../../globalservices/sharedservices/navigationshared.service'
import { NavigationService } from '../../globalservices/navigation/navigation.service';
import {PrimaryNavigationService} from '../../globalservices/primary-navigation/primary-navigation.service';
import { NavigationModel } from '../../models/navigation';
import {GlobalNavData} from '../../utilities/globalNavigationData'
import {homePagePathKey} from '../../configurations/configuration'
//import { trigger, state, animate, transition, style } from '@angular/animations';
//import { fadeInAnimation } from '../../_animations/anime1';


import { trigger, state, animate, transition, style } from '@angular/animations';
//import { fadeInAnimation } from '../../_animations/anime1';
import { LoaderService } from '../../globalservices/sharedservices/loader.service';

@Component({
    selector: 'app-maincontent',
    templateUrl: './maincontent.component.html',
    styleUrls: ['./maincontent.component.scss']
    //   animations: [
    //     fadeInAnimation
    // ],
    // host: { '[@fadeInAnimation]': '' }
})

export class MaincontentComponent implements OnInit  {

    private router: Router;
    subscription: Subscription;
    carousal: any;
    categoryPath: string;
    categoryType: string;
    loadedOnce:boolean;
    urlParams: any;
    navModel: NavigationModel;
    //navData: NavigationData[] = [];
    navData: NavigationModel;
    navigationValid: boolean = true;
    nothingLoading: boolean = true;

    constructor(private _router: Router, private activatedRoute: ActivatedRoute, 
        private navigationSharedService: Navigationshared, private _navigation: NavigationService,
        private primNavService: PrimaryNavigationService,
        private globalNavData: GlobalNavData, private loaderService: LoaderService,
        private meta: Meta)
    {
        this.router = _router;
        this.loadedOnce = false;
        this.loaderService.display(true);
        this.activatedRoute.params.subscribe(params => {
            this.urlParams = params; 
            if(this.globalNavData.data != undefined)  {
                this.navData = this.globalNavData.data;
                this.bindPageContent();
            }
        });

        this.subscription = navigationSharedService.sendNavigationLoaded$.subscribe(
            message => {
                //console.log('main component: navigation loaded, now load the data');
                this.navData = message;
                this.bindPageContent();
                this.loadedOnce = true;
                //this.activatedRoute.params.subscribe(params => { this.urlParams = params, this.bindPageContent() });
                
        });

        
    }

    ngOnInit() {
        // this.bindPageContent();
        //this._router.events.subscribe((evt) => {
        //    if (!(evt instanceof NavigationEnd)) {
        //        window.scrollTo(0, 0);
        //        return;
        //    }
        //    else if (!(evt instanceof NavigationStart)) {
        //        window.scrollTo(0, 0);
        //        return;
        //    }

        //});
        
    }

    ngAfterViewInit() {
        //console.log("here i am");
        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                window.scrollTo(0, 0);
                return;
            }
            

        });
        
    }

    bindPageContent() {
        
        this.nothingLoading = false;
        
        let pageTitle = '';
        if(this.urlParams['name'] == undefined ||
        this.urlParams['name'] == "")
            pageTitle = 'Home';
        else
            pageTitle = this.urlParams['name'];



         //   this.navigationSharedService.routerDataLoaded(pageTitle);
        //console.log(this.urlParams['name']);
         let navigationPath: string = this.getNavigationPath();
          this.primNavService.getPrimaryNavigationData(navigationPath,'')
          .subscribe(
              result => {
                console.log(result);
                this.carousal = result.carousal;
                //this.pageCategory = result.page_category;
                // Set the values based on the selected primary navigation
                this.categoryPath = navigationPath;//result.path;
                this.categoryType = result.type;
                //console.log(this.carousal); 
                this.loaderService.display(false);
                  
                this.bindMetaData(result);
                if(result.seo != undefined && result.seo.title != '') {
                    this.navigationSharedService.routerDataLoaded(result.seo.title);
                } else {
                    this.navigationSharedService.routerDataLoaded(pageTitle);
                }
                
                this.nothingLoading = true;
                
              }
          );
      }

      bindMetaData(result) {
        this.meta.removeTag("name='description'");
        this.meta.removeTag("name='title'");
        this.meta.removeTag("name='keywords'");
        
        if(result.seo != undefined) {
        this.meta.addTag({ name: 'description', content: result.seo.description });
        this.meta.addTag({ name: 'title', content: result.seo.title });
        this.meta.addTag({ name: 'keywords', content: result.seo.keywords });
        } 
      }

      getNavigationPath(): string {
          if(this.urlParams['name'] == undefined ||
          this.urlParams['name'] == "")
            return homePagePathKey;

          for (let entry of this.navData.data)
          {
              if (entry.alias.substr(1) === this.urlParams['name'])
              //if (entry.alias.indexOf(this.urlParams['name']) != -1)
              {
                  this.navigationValid = true;
                  return entry.path;
              }
              else {
                  this.navigationValid = false;
              }
            this.navData.data[0].alias;
          }
      }
}
