import { Component, OnInit, Input, NgZone } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { NavigationService } from '../../../globalservices/navigation/navigation.service';
import { NavigationModel } from '../../../models/navigation';
import { NavigationData } from '../../../models/navigation-data';
import {Navigationshared} from '../../../globalservices/sharedservices/navigationshared.service'
import { Subscription } from 'rxjs/Subscription';
import {GlobalNavData} from '../../../utilities/globalNavigationData'
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {SearchService} from '../../../globalservices/search/search.service'
import { ElementSchemaRegistry } from '@angular/compiler';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    //styleUrls: ['./navigation.component.css']

})
export class NavigationComponent implements OnInit {
    private navModel: NavigationModel;
    sitelogo: string;
    navData: NavigationData[] = [];
    subscription: Subscription;
    storedsearch:any;
    @Input() searchQuery: string;
    searchTerm: FormControl = new FormControl();
    currentMenu: any;
    defaultSelectedMenuItem: any;

      searchResults: any[] = [];
      menuStyles = {
      'border-bottom':'2px solid rgba(255,94,0,1)',
      'color': 'rgba(255,94,0,1)'
      }
    constructor(private _navigation: NavigationService
        , private navigationSharedService: Navigationshared,
        private zone:NgZone, private router: Router
        , private activatedRoute: ActivatedRoute, private globalNavData: GlobalNavData,
        private searchService: SearchService)
    {
        this.activatedRoute.params.subscribe(params => {
            this.currentMenu = params;

            this.bindNavigations();
        });

        if ( this.storedsearch ) {
              this.storedsearch.unsubscribe();
        }

        this.searchTerm.valueChanges
   		.debounceTime(400)
   		.subscribe(data => {
            this.searchResults = [];
   			this.searchService.getSearchResults(data, '0', '5').subscribe(response =>{
                   //console.log(response);
                   if(response.data != undefined)
   				    this.searchResults = response.data;
   			})
           })

        this.navigationSharedService.sendNavigationChanged$.subscribe(message=> {
            this.reAssignActiveStyle('null');
        })
    }

    ngOnInit() {

        this.bindNavigations();

  }

   //when user is focus on search input field get top 5 result of stored users.
    getStoredSearchResults(){

        this.searchResults = [];
        //send empty data to query.
        this.storedsearch = this.searchService.getLatestStoredSearchResults('', '0', '5').subscribe(response =>{
                        console.log(response);
            if(response.data != undefined) {
                this.searchResults = response.data;
            }
        })

    }


  bindNavigations() {
    this._navigation.getNavigations()
    .subscribe(
        result => {
            //console.log(result);
            this.navModel = result;
            this.navModel = result;
            //console.log(this.navModel);
            this.sitelogo = this.navModel.logo;
            //console.log(this.navModel);
            this.sitelogo = this.navModel.logo;
            let primNavData = []
            for (let pc of this.navModel.data) {
                if(pc.orientation[0].is_header == true)
                    primNavData.push(pc);
            }

            this.navData = primNavData;
            console.log(this.navData);
            this.navData.sort( function(item1, item2) {
                if ( Number(item1.display_indexing) < Number(item2.display_indexing) ){
                    return -1;
                }else if( Number(item1.display_indexing) > Number(item2.display_indexing) ){
                    return 1;
                }else{
                    return 0;
                }
            });

            this.globalNavData.data = result;
            if(this.activatedRoute.snapshot.params['name'] != undefined)
                this.reAssignActiveStyle(this.activatedRoute.snapshot.params['name']);
            else {
                this.reAssignActiveStyle('home');
            }
            this.navigationSharedService.receiveNavigationLoaded(result);
        }
    );
  }


  navigateTo(path) {
    this.zone.run(() => this.router.navigate([path]));
    this.reAssignActiveStyle(path);
  }

  reAssignActiveStyle (path: string){
    for(let item of this.navData) {
        if(item.alias.indexOf(path) != -1) 
            item.extraStyle = this.menuStyles;
        else
            item.extraStyle = {}
    }
  }

  fireSearch () {
     this.searchResults = [];
     this.globalNavData.searchQuery = this.searchQuery;
     let _t = this.searchQuery.trim().toLocaleLowerCase().replace(/\s+/g, '-')
     this.router.navigate(['/web/search/'+_t]);
     this.searchQuery = "";
  }

  itemClicked(slide) {
        this.searchResults = [];
        switch(slide.type) {
            case 'asset':
            let _t = slide.orientation[0].title.trim().toLowerCase();
            _t = _t.replace(/\s+/g, '-');
            this.router.navigate(['video/'+ _t + '/' + slide.path ]);
        }

        let uid = sessionStorage.getItem('ud');
        if (uid !== undefined && uid != null) {
            //this function is used for storing search asset in search_master table.
            this.searchService.addSearchResults(slide.path)
            .subscribe(
                result => {
                    console.log(result);
                }
            );
        } else {
            //let stored_assets_arr = [];
            //stored_assets_arr = sessionStorage.getItem('stored_assets');
            //stored_assets_arr.push(slide.path);
            //var allEntries = JSON.parse(localStorage.getItem("stored_assets")) || [];
            //allEntries.push(slide.path); 
            //sessionStorage.setItem("stored_assets", JSON.stringify(allEntries));
            //sessionStorage.setItem('stored_assets', slide.path);
            
            
            // Get the existing data
            let existing_string = sessionStorage.getItem('stored_assets');

            // If no existing data, create an array
            // Otherwise, convert the localStorage string to an array
            let existingArr = existing_string ? existing_string.split(',') : [];

            // Add new data to localStorage Array
            existingArr.push(slide.path);

            // Save back to localStorage
            sessionStorage.setItem('stored_assets', existingArr.toString());
            
            
        }
  }

  onClickedOutsideSearchBlock(event) {

  }


}
