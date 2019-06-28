import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
//import { NgxCarousel } from 'ngx-carousel';
import { Router, ActivatedRoute } from '@angular/router';

import { PageCategoryService } from '../../globalservices/page-category/pagecategory.service';
import { PageCategory } from '../../models/page-category';
import { PageCategoryContent } from '../../models/page-category-content';
import { navigationClickData } from '../../models/navigation-click-data'

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { defaultAssetImage } from '../../configurations/configuration';

@Component({
    selector: 'app-pagecategory',
    templateUrl: './pagecategory.component.html',
    styleUrls: ['./pagecategory.component.scss']
})
export class PagecategoryComponent implements OnInit, OnChanges {

    //@Input() data: PageCategory[];
    @Input() catPath: string;
    @Input() catType: string;
    @Output() public onNavigationClicked = new EventEmitter<navigationClickData>();
    _categoryPath: string;
    _categoryType: string;
    pageCategories: PageCategory;
    pageContents: PageCategoryContent[] = [];
    pageCategoryModel: any[] = [];
    defaultImg: string;
    defaultImgHorizontal: string;
    carousalOptions = {
        loop: false,
        margin: 10,
        responsiveClass: true,

        responsive: {
            0: {
                items: 2,
                nav: true,
                margin: 10
            },
            768: {
                items: 4,
                nav: true,
                margin: 10
            },
            992: {
                items: 5,
                nav: true,
                loop: false,
                margin: 10
            },
            1280: {
                items: 6,
                nav: true,
                loop: false,
                margin: 10
            },
            1600: {
                items: 6,
                nav: true,
                loop: false,
                margin: 10
            },
            1920: {
                items: 6,
                nav: true,
                loop: false,
                margin: 10
            }
        }
    };

    carousalOptionsHorizontal = {
        loop: false,
        margin: 10,
        responsiveClass: true,

        responsive: {
            0: {
                items: 2,
                nav: true,
                margin: 10
            },
            600: {
                items: 4,
                nav: true,
                margin: 0
            },
            1000: {
                items: 5,
                nav: true,
                loop: false,
                margin: 10
            },
            1280: {
                items: 6,
                nav: true,
                loop: false,
                margin: 10
            },
            1600: {
                items: 6,
                nav: true,
                loop: false,
                margin: 5
            },
            1920: {
                items: 6,
                nav: true,
                loop: false,
                margin: 10
            }
        }
    };   

    mpcarousalOneOptions = {
        loop: false,
        margin: 10,
        responsiveClass: true,

        responsive: {
            0: {
                items: 1,
                nav: true,
                margin: 10
            },
            600: {
                items: 1,
                nav: true,
                margin: 0
            },
            1000: {
                items: 2,
                nav: true,
                loop: false,
                margin: 10
            },
            1280: {
                items: 2,
                nav: true,
                loop: false,
                margin: 10
            },
            1600: {
                items: 2,
                nav: true,
                loop: false,
                margin: 5
            },
            1920: {
                items: 2,
                nav: true,
                loop: false,
                margin: 10
            }
        }
    };   

    mpcarousalTwoOptions = {
        loop: false,
        margin: 10,
        responsiveClass: true,

        responsive: {
            0: {
                items: 1,
                nav: true,
                margin: 10
            },
            600: {
                items: 1,
                nav: true,
                margin: 0
            },
            1000: {
                items: 2,
                nav: true,
                loop: false,
                margin: 10
            },
            1280: {
                items: 2,
                nav: true,
                loop: false,
                margin: 10
            },
            1600: {
                items: 2,
                nav: true,
                loop: false,
                margin: 5
            },
            1920: {
                items: 2,
                nav: true,
                loop: false,
                margin: 10
            }
        }
    };   

    mpcarouselOneItems = [
        '/assets/images/mp-2.png',
        '/assets/images/mp-3.png',
        '/assets/images/mp-2.png',
        '/assets/images/mp-3.png',
        '/assets/images/mp-2.png',
        '/assets/images/mp-3.png'
    ];
    mpcarouselTwoItems = [
        '/assets/images/mp-4.png',
        '/assets/images/mp-5.png',
        '/assets/images/mp-4.png',
        '/assets/images/mp-5.png',
        '/assets/images/mp-4.png',
        '/assets/images/mp-5.png'
    ];

    initialLoadItems: number = 2;
    skippedItems: number = 0;
    totalItems: number;
    pageCategoriesLoading: boolean = false;
    //nothingLoading = true;   
    constructor(private _pageCategoryService: PageCategoryService, private route: Router) {
        //this._categoryPath = this.catPath;
        //this._categoryType = this.catType;
        this.defaultImg = '/assets/images/default_image.png';
        this.defaultImgHorizontal = '/assets/images/default_image_horizontal.jpg';
    }


    ngOnInit() {

        this.initialLoadItems = 2;
        this.skippedItems = 0;
        this.pageCategoriesLoading = false;

    }

    /*
    ngOnChanges(changes: {[propKey: string]: SimpleChanges}) {
        let log: string[] = [];
        
        if (changes['catPath'] && changes['catType'])
        {
            if (changes['catPath'].currentValue !== undefined && changes['catType'].currentValue !== undefined)
            {
                console.log("path changedddddd");
                this._pageCategoryService.getPageCategories(this.catPath, 'WEB', this.catType, 0, 0)
                    .subscribe(result => {
                        //console.log(result);
                        this.pageCategories = result;
                        this.pageContents = this.pageCategories.content;
  
                        for (let pc of this.pageContents) {
                            let isVisible = pc.orientation[0].is_visible;
                            let _t = pc.orientation[0].title;
  
                            if (isVisible && _t !== null) {
                                let _p = pc.path;
  
                                let _t = pc.orientation[0].title.trim().toLowerCase();
                                _t = _t.replace(/\s+/g, '-');
  
                                this.pageCategoryModel.push(
                                    {
                                        'path': _p,
                                        'title': _t,
                                        'displayTitle': pc.orientation[0].title
                                    });
                            }
  
                        }
  
                        //console.log(this.pageCategoryModel);
  
                    });
            }
            
  
              //this.carousalItems = [];
              //if(this.data) {
              //  for (let entry of this.data) 
              //    {
              //      this.carousalItems.push({'img':entry.data[0].orientation[0].image, 
              //      'title':entry.data[0].orientation[0].title,
              //      'description':entry.data[0].orientation[0].title,'path':entry.data[0].path,'type':entry.data[0].type});
              //      console.log(entry.orientation[0].image);
              //    }
         
              //}
          }
    }
    */

    ngOnChanges(changes: SimpleChanges) {
        let log: string[] = [];
        //const name: SimpleChange = changes.name;
        //console.log('prev value: ', changes);
        //console.log('got name: ', name.currentValue);

        if (changes['catPath']) {
            if (changes['catPath'].currentValue !== undefined)// && changes['catType'].currentValue !== undefined) 
            {
                //console.log("path changedddddd");
                this.initialLoadItems = 2;
                this.skippedItems = 0;
                this.pageCategoryModel = [];
                this.bindPageCategories();

            }

            
        }

    }

    slideClicked(slide) {
        
        switch (slide.type) {
            case 'asset':
                let _t = slide.orientation[0].title.trim().toLowerCase();
                _t = _t.replace(/\s+/g, '-');
                this.route.navigate(['video/' + _t + '/' + slide.path]);
        }

        //let navigationData: navigationClickData = new navigationClickData;
        //navigationData.path = slide.path;
        //navigationData.type = slide.type;

        //this.onNavigationClicked.emit(navigationData);
    }

    bindPageCategories() {
        //this.nothingLoading = false;
        
        this._pageCategoryService.getPageCategories(this.catPath, 'WEB', this.catType, this.initialLoadItems, this.skippedItems)
            .subscribe(result => {
                
                this.pageCategories = new PageCategory();
                this.pageContents = [];
                this.pageCategories = result;
                this.pageContents = this.pageCategories.content;
                console.log("Page Categories ---------------------- ", this.pageCategories)

                this.pageContents.sort(function (item1, item2) {
                    if (Number(item1.display_indexing) < Number(item2.display_indexing)) {
                        return -1;
                    } else if (Number(item1.display_indexing) > Number(item2.display_indexing)) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                for (let pc of this.pageContents) {
                    let isVisible = pc.orientation[0].is_visible;
                    if (pc.orientation[0].title == undefined ||
                        pc.orientation[0].title == null ||
                        pc.orientation[0].title == '')
                        pc.orientation[0].title = pc.orientation[0].label;

                    let _t = pc.orientation[0].title;

                    if (isVisible && _t !== null) {
                        let _p = pc.path;
                        
                        let _display_type = pc.display_type;

                        let _t = pc.orientation[0].title.trim().toLowerCase();
                        _t = _t.replace(/\s+/g, '-');

                        let carousalOptions = this.carousalOptions;
                        let carousalOptionsHorizontal = this.carousalOptionsHorizontal;
                        let pcArray = [];
                        for (let pcItem of pc.data) {
                            if (pcItem.orientation[0].is_visible) {

                                if (pcItem.orientation[0].label == undefined ||
                                    pcItem.orientation[0].label.length == 0)
                                    pcItem.orientation[0].label = pcItem.orientation[0].title;


                                pcArray.push(pcItem);
                            }
                        }

                        /* //Commented by Ranjeet - Sorting array lasted added
                        pcArray.sort(function (item1, item2) {
                            if (Number(item1.display_indexing) < Number(item2.display_indexing)) {
                                return -1;
                            } else if (Number(item1.display_indexing) > Number(item2.display_indexing)) {
                                return 1;
                            } else {
                                return 0;
                            }
                        });*/

                        // carousalOptions.items = pc.data.length;
                        
                        if(_display_type=="Horizontal"){
                            this.pageCategoryModel.push(
                                {
                                    'path': _p,
                                    'title': _t,
                                    'displayTitle': pc.orientation[0].title,
                                    'data': pcArray,
                                    'carousalOptions': carousalOptionsHorizontal,
                                    'display_type': _display_type,
                                });    
                        }else{
                            this.pageCategoryModel.push(
                                {
                                    'path': _p,
                                    'title': _t,
                                    'displayTitle': pc.orientation[0].title,
                                    'data': pcArray,
                                    'carousalOptions': carousalOptions,
                                    'display_type': _display_type,
                                });    
                        }

                        console.log(this.pageCategoryModel);
                       

                        //console.log(carousalOptions);
                    }

                }

                //console.log(this.pageCategoryModel);
                this.pageCategoriesLoading = false;
                
                //this.nothingLoading = true;
                
            });
    }

    onScroll() {
        //console.log('scrolled!!');
        this.pageCategoriesLoading = true;
        this.skippedItems = this.skippedItems + this.initialLoadItems;
        this.bindPageCategories();

    }

}
