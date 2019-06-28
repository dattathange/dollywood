import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageCategoryListingService } from '../../globalservices/page-category-listing/pagecategorylisting.service';
import { PageCategoryListing } from '../../models/page-category-listing';
import {Navigationshared} from '../../globalservices/sharedservices/navigationshared.service'
import { trigger, state, animate, transition, style } from '@angular/animations';
import { fadeInAnimation } from '../../_animations/anime1';

@Component({
    //selector: 'app-pagecategorylisting',
    templateUrl: './pagecategorylisting.component.html',
    //styleUrls: ['./pagecategorylisting.component.scss'],
    animations: [
        fadeInAnimation
    ],
    host: { '[@fadeInAnimation]': '' }
})
export class PageCategorylistingComponent implements OnInit {
    
    private router: Router;
    _urlParams: any;
    private _pageCategoryId: string;
    _pageListingModel: PageCategoryListing;
    pageCategoryTitle: string;
    assetsList: any[] = [];
    defaultImg: string;
    defaultImgHorizontal: string;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, 
        private _pageCategoryListingService: PageCategoryListingService,
        private navigationSharedService: Navigationshared) {
        this.router = _router;
        this._activatedRoute.params.subscribe(params => { this._urlParams = params });
        this.defaultImg = '/assets/images/default_image.png';
        this.defaultImgHorizontal = '/assets/images/default_image_horizontal.jpg';
    }

    ngOnInit() {
        this.navigationSharedService.receiveNavigationChanged('categorylisting');
        this._pageCategoryId = this._urlParams['id'];
        //console.log(this._pageCategoryId);
        this._pageCategoryListingService.getPageCategoryListing(this._pageCategoryId,'WEB','',0,0)
            .subscribe(
                result => {
                //    console.log(result);
                    this._pageListingModel = result;
                    this.pageCategoryTitle = this._pageListingModel.orientation[0].title;
                    let _display_type = this._pageListingModel.display_type;
                    //this.assetsList = this._pageListingModel.data;
                    for (let asset of this._pageListingModel.data)
                    {
                        let isVisible = asset.orientation[0].is_visible;
                        let _displayTitle = asset.orientation[0].title;
                        let _t = asset.orientation[0].title;
                        let _desc = asset.orientation[0].description;
                        let _img = asset.orientation[0].image;
                        let _img_horizontal = asset.orientation[0].image_horizontal;
                        
                        if (isVisible && _t !== null) {
                            let _p = asset.path;

                            let _t = asset.orientation[0].title.trim().toLowerCase();
                            _t = _t.replace(/\s+/g, '-');

                            this.assetsList.push(
                                {
                                    'path': _p,
                                    'title': _t,
                                    'displayTitle': _displayTitle,
                                    'display_type': _display_type,
                                    'desc': _desc,
                                    'image': _img,
                                    'image_horizontal': _img_horizontal,
                                    'duration': asset.duration
                                });
                        }

                    }

                    this.bindPageTitle(this.pageCategoryTitle);
                }
            );

    }

    bindPageTitle(catTitle) {
        this.navigationSharedService.routerDataLoaded(catTitle);
    }

}
