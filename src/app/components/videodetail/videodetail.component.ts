import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { fadeInAnimation } from '../../_animations/anime1';
import { Meta } from '@angular/platform-browser';


import { environment } from '../../../environments/environment';
import { AssetsService } from '../../globalservices/assets/assets.service';
import { FavoritesService } from '../../globalservices/favorites/favorites.service';
import { RelatedvideosService } from '../../globalservices/relatedvideos/relatedvideos.service';
import { WatchlistService } from '../../globalservices/watchlist/watchlist.service';
import { Asset } from '../../models/asset';
import {Navigationshared} from '../../globalservices/sharedservices/navigationshared.service'
import { defaultAssetThumbnail } from '../../configurations/configuration';
import { LoaderService } from '../../globalservices/sharedservices/loader.service';

//import {bitmovinConfig,bitmovinconfigWithAnalytics} from '../../configurations/configuration';

// we declare our global RadiantMP function
declare const RadiantMP: any;

declare const bitmovin: any;

@Component({
    //selector: 'app-videodetail',
    templateUrl: './videodetail.component.html',
    styleUrls: ['./videodetail.component.scss'],
    animations: [
        trigger('visibilityChanged', [
            state('true', style({ opacity: 1, transform: 'translateX(-50%)' })),
            state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
            //transition('* => *', animate('.5s')),
            transition('0 => 1', animate('.5s')),
            //transition('0 => 1', animate('.9s'))
        ]),
        fadeInAnimation
    ],
    host: { '[@fadeInAnimation]': '' }
})
export class VideodetailComponent implements OnInit {
    private router: Router;
    // rmp variables
    playerInitialized: boolean = false;
    rmp: any;
    translateBy: any = 0;
    isPrevDisabled: boolean = true;
    isNextDisabled: boolean = false;
    globalRmpSettings: any = {
        licenseKey: environment.radiantMediaPlayerKey,
        delayToFade: 3000,
        autoHeightMode: false,
        height: 650,
        autoplay: false,
        quickRewind:10
        //pathToRmpFiles: './assets/radiant-media-player',

    };
    elementID: string = 'rmpPlayer';
    _urlParams: any;
    _assetID: string;
    _videoDetailModel: Asset
    videoTitle: string;
    posterImage:string;
    videoDescription: string;
    genreList: any[] = [];
    isUserLoggedIn: boolean = false;
    visibility = false;
    playerVisible = "goAwayPlayer";
    hidecontent = "";
    assetAdded = false;
    assetAddedVisibility = false;
    assetRemovedVisibility = false;
    _userId: string;
    relatedVidVisible: boolean = true;
    suggestedVidVisible: boolean = false;
    genreIDs: string;
    relatedVideosList: any[] = [];
    suggestedVideosList: any[] = [];
    defaultImg: string;
    defaultImgSuggested: string;
    watchListTime: number = 5000;
    watchListTimeBitmovin: number = 5;
    addedToWatchList: boolean = false;
    castCrewDetails: any = {};
    reviews: any;
    duration: string = "";
    activeTab: string = "cast";
    nothingLoading: boolean = true;
    castCrewDataFetched: boolean = false;
    castClass: string = "tabs__tab ";
    commentsClass: string = "tabs__tab active";
    reviewsClass: string = "tabs__tab";
    hidden: string;
    visibilityChange:string;
   carousalOptions = {
        loop: false,
        margin: 10,
        responsiveClass: true,

        responsive: {
            0: {
                items: 2,
                nav: true,
                margin:10
            },
            768: {
                items: 4,
                nav: true
            },
            992: {
                items: 6,
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

    playerObject;any;
    
    bitmovinKey: string;
    bitmovinAnalyticsKey: string;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
        private _assetService: AssetsService, private _favoritesService: FavoritesService,
        private _relatedVideoService: RelatedvideosService, private _watchService: WatchlistService,
        private navigationSharedService: Navigationshared, private loaderService: LoaderService,
        pLocation: PlatformLocation, private meta: Meta)
    {
        this.router = _router;
        //this._activatedRoute.params.subscribe(params => { this._urlParams = params });
        this.defaultImg = '/assets/images/default_image.png';
        this.defaultImgSuggested = '/assets/images/default_image_suggested.png';
        this.loaderService.display(true);

        // to destroy player instance on browser back button
        pLocation.onPopState(() => {
            //console.log("pop state");
            if (!this.playerInitialized) {
                if (this.rmp) {
                    this.rmp.destroy();
                    setTimeout(() => { this.rmp.destroy(); }, 2000);

                }
            }
        });
    }

    // next(items) {
    //     if(this.isNextDisabled) {
    //         return
    //     }
    //     this.isPrevDisabled = false;
    //     let slideWrapperLength = '-' + (260 * items) + 'px';
    //     this.translateBy += -260;
    //     if(this.translateBy == slideWrapperLength) {
    //         this.isNextDisabled = true;
    //     }  
    //     document.getElementById('slide_wrapper').style.transform  = "translate(" + this.translateBy + "px)";
    // }

    // prev() {
    //     if(this.isPrevDisabled) {
    //         return
    //     }
    //     this.translateBy += 260;
    //     if(this.translateBy === 0) {
    //         this.isPrevDisabled = true;
    //     }  
    //     document.getElementById('slide_wrapper').style.transform  = "translate(" + this.translateBy + "px)";
    // }

    ngOnInit() {
        this.navigationSharedService.receiveNavigationChanged('video');

        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationStart)) {
                //console.log("navigation started");
                if (!this.playerInitialized)
                {
                    if (this.rmp) {
                        this.rmp.destroy();
                    }
                }

                return;
            }

        });

        this._activatedRoute.params.subscribe(params =>
        {
            this._urlParams = params

            //console.log(this.router.url);
            //console.log(this._urlParams);
            this._assetID = this._urlParams['id'];
            let uid = sessionStorage.getItem('ud');
            //console.log(uid);
            if (uid !== undefined && uid != null) {
                this._userId = uid;
                this.isUserLoggedIn = true;
            }

            //console.log(this._assetID);
            // Check for document visibility
            if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
                this.hidden = 'hidden';
                this.visibilityChange = 'visibilitychange';
            }




            //else if (typeof document.msHidden !== 'undefined') {
            //    this.hidden = 'msHidden';
            //    this.visibilityChange = 'msvisibilitychange';
            //} else if (typeof document.webkitHidden !== 'undefined') {
            //    this.hidden = 'webkitHidden';
            //    this.visibilityChange = 'webkitvisibilitychange';
            //}


            this._assetService.getAssetDetails(this._assetID, '')
                .subscribe(
                    result => {
                        //console.log(result);
                        this._videoDetailModel = result;
                        if (this._videoDetailModel.data.orientation.length > 0) {
                            this.bitmovinKey = this._videoDetailModel.bitmovin_result.bitmovin_key;
                            this.bitmovinAnalyticsKey = this._videoDetailModel.bitmovin_result.bitmovin_analytics_key;
                            
                            
                            let bitmovinConfig: any = {
                                "key": this.bitmovinKey 
                            }

                            let bitmovinconfigWithAnalytics:any = Object.assign({}, bitmovinConfig, {
                                analytics: {
                                  key: this.bitmovinAnalyticsKey,
                                  videoId: 'Getting Started Player'
                                }
                            });
                            
                            
                            
                            this.videoTitle = this._videoDetailModel.data.orientation[0].title;
                            this.videoDescription = this._videoDetailModel.data.orientation[0].description;
                            this.duration = this._videoDetailModel.duration;
                            let playerContainer = document.getElementById(this.elementID);
                            this.posterImage = this._videoDetailModel.data.orientation[0].poster_image;

                            /*
                            let config = {
                                "key": "c205d1e6-70ff-45b7-af5a-d6084de8c6ed"
                            };
                            let  configWithAnalytics:any = Object.assign({}, config, {
                                analytics: {
                                  key: '26008b07-dea7-4705-b6f8-6819e1db26c7',
                                  videoId: 'Getting Started Player'
                                }
                            });*/

                            var objVideoDetailComponent =  this;
                            var onTimeChanged = function (data) {
                                let currPlaybackTime = player.getCurrentTime();
                                if (currPlaybackTime > objVideoDetailComponent.watchListTimeBitmovin) {
                                    if (!objVideoDetailComponent.addedToWatchList) {
                                        objVideoDetailComponent.addedToWatchList = true;
                                        addToWatchListJavascript();
                                        player.off('TimeChanged', () => { });
                                    }
                                }
                            };

                            var addToWatchListJavascript = function() {
                                if (objVideoDetailComponent.isUserLoggedIn) {
                                    objVideoDetailComponent._watchService.addUserWatchList(objVideoDetailComponent._userId, objVideoDetailComponent._assetID)
                                    .subscribe(result => {
                                       //console.log("added to watchlist");
                                    });
                                }
                            };

                            let source = {
                                //title: 'Art of Motion',
                                //description: 'What is this event... Parcour?',
                                hls: this._videoDetailModel.data.orientation[0].playback_url,
                                poster:this._videoDetailModel.data.orientation[0].poster_image
                                //progressive: '//bitmovin-a.akamaihd.net/content/MI201109210084_1/MI201109210084_mpeg-4_hd_high_1080p25_10mbits.mp4'
                            };

                            let container = document.getElementById('bitmovin-player');
                            let player = new bitmovin.player.Player(container, bitmovinconfigWithAnalytics);
                            player.on(bitmovin.player.PlayerEvent.TimeChanged, onTimeChanged);

                            player.load(source).then(
                              function(player) {
                                  //Success
                                  //console.log('Successfully created Bitmovin Player instance');
                                },
                              function(reason) {
                                  //Error
                                  //console.log('Error while creating Bitmovin Player instance');
                                }
                            );


                            this.playerObject =   player; //set player object globally

                            if (!this.playerInitialized) {
                                // if player is not initialized we need to call init
                                this.rmp = new RadiantMP(this.elementID);
                                this.globalRmpSettings.bitrates = {
                                    hls: this._videoDetailModel.data.orientation[0].playback_url
                                };
                                this.globalRmpSettings.poster = this._videoDetailModel.data.orientation[0].poster_image;
                                this.rmp.init(this.globalRmpSettings);
                                this.playerInitialized = true;

                            } else if (this.rmp) {
                                // if player is initialized we change src
                                //this.rmp = undefined;
                                //let parent = playerContainer.parentNode;
                                //parent.removeChild(playerContainer);
                                //this.rmp.destroy();

                                //playerContainer = document.getElementById(this.elementID);
                                //this.rmp = new RadiantMP(this.elementID);
                                //this.globalRmpSettings.bitrates = {
                                //    hls: this._videoDetailModel.data.orientation[0].playback_url
                                //};
                                //this.globalRmpSettings.poster = this._videoDetailModel.data.orientation[0].poster_image;
                                //this.rmp.init(this.globalRmpSettings);
                                //this.playerInitialized = true;
                                this.rmp.setPoster(this._videoDetailModel.data.orientation[0].poster_image);
                                this.rmp.setSrc(this._videoDetailModel.data.orientation[0].playback_url);

                            }

                            /*
                            playerContainer.addEventListener('play', () => {
                                //this.addToWatchList();
                            });*/
                            /*
                            playerContainer.addEventListener('timeupdate', (e) => {
                                //console.log(e);
                                //console.log(this.rmp.getCurrentTime());
                                let currPlaybackTime = this.rmp.getCurrentTime();
                                if (currPlaybackTime > this.watchListTime) {
                                    if (!this.addedToWatchList) {
                                        this.addToWatchList();
                                        this.addedToWatchList = true;
                                        playerContainer.removeEventListener('timeupdate', () => { });
                                    }
                                }
                            });*/

                            // Handle page visibility change
                            document.addEventListener(this.visibilityChange, () => {
                                if (this.rmp) {
                                    if (document.hidden) {
                                        this.rmp.pause();
                                    }
                                    else {
                                        //this.rmp.play();
                                    }
                                }
                            });

                            this.bindUserFavorites();
                            this.bindPageTitle();
                            this.loaderService.display(false);
                            this.bindBottomTabs();
                            this.bindGenres();

                            this.relatedVideosList= [];

                            this.bindRelatedVideos();

                            this.suggestedVideosList = [];


                            this.bindSuggestedVideos();
                            this.bindMetaData(result);
                        }



                        // Add radiant media player play event listener
                        //this.rmp.addEventListener('play', () => {
                        //    console.log("video play started");
                        //})
                        //let simple = this.renderer.listen(this.elementID, 'play', (evt) => {
                        //    console.log('Clicking the button', evt);
                        //});
                    }
                );


        });

        this.showPlayer();

    }

    //seek playback to 30sec forword and backword
    seekPlayer(duration){
        this.playerObject.seek(this.playerObject.getCurrentTime() + duration);
    }

   showPlayer() {
       if (this.isUserLoggedIn) {
        //console.log("clicked");
        this.playerVisible = "";
        this.hidecontent = "hidden";
        this.rmp.play();
        }
        else{
            this.router.navigate(['/user/login/']);
        }
    }
    hidePlayer(){
        this.playerVisible = "goAwayPlayer";
        this.hidecontent = "";
         this.rmp.destroy();
    }

    onDestroyPlayer(): void {
        if (this.rmp) {
            // destroy player if present button destroy button is clicked
            let playerContainer = document.getElementById(this.elementID);
            playerContainer.addEventListener('destroycompleted', () => {
                this.rmp = undefined;
                let parent = playerContainer.parentNode;
                parent.removeChild(playerContainer);
                //let button = document.getElementById('destroyPlayer');
                //button.textContent = 'Player has been destroyed!';
            })
            this.rmp.destroy();
        }
    }

    bindUserFavorites() {

        let uid = sessionStorage.getItem('ud');
        //console.log(uid);
        if (uid !== undefined && uid != null) {
              this._favoritesService.getUserFavorites(uid)
                .subscribe(
                    result => {
                        if(result.data != undefined)
                          for(let item of result.data) {
                            if(item.path == this._assetID)
                            {
                                this.assetAdded = true;
                                return;
                            }
                          }


                    }
                );
              }
      }

    bindGenres() {

        for (let genre of this._videoDetailModel.genre) {
            if (genre.orientation.length > 0)
            {
                let isVisible = genre.orientation[0].is_visible;
                let _t = genre.orientation[0].title;
                let _img = genre.orientation[0].image;

                if (isVisible && _t !== null) {
                    let _p = genre.path;
                    let _t = genre.orientation[0].title.trim().toLowerCase();
                    _t = _t.replace(/\s+/g, '-');


                    this.genreList.push(
                        {
                            'path': _p,
                            'title': _t,
                            'displayTitle': genre.orientation[0].title,
                            'image': _img
                        });


                }
            }

        }
    }

    addToWatchList() {

        if (this.isUserLoggedIn) {

            this._watchService.addUserWatchList(this._userId, this._assetID)
                .subscribe(result => {
                   //console.log("added to watchlist");

                });

        }
    }

    addToFav() {
        //console.log("addToFav");
        //this.isUserLoggedIn = true; // added for check
        if (this.isUserLoggedIn) {

            this._favoritesService.addUserFavourites(this._userId, this._assetID)
                .subscribe(result => {
                    this.visibility = false;
                    this.assetAdded = true;
                    this.assetAddedVisibility = true;

                    setTimeout(() => {
                        this.assetAddedVisibility = false;
                    }, 5000);
                });

        }
        else {
            this.visibility = true;
            //console.log(this.visibility);

            setTimeout(() => {
                this.visibility = false;
            }, 5000);
        }
    }

    removeFromFav()
    {
        this._favoritesService.removeUserFavorite(this._userId,this._assetID).subscribe (result=> {
            this.assetAdded = false;
            this.assetRemovedVisibility = true;

            setTimeout(() => {
                this.assetRemovedVisibility = false;
            }, 5000);

        })

    }

    bindRelatedVideos() {
        if (this._videoDetailModel.genre.length > 0)
        {
            this.genreIDs = this._videoDetailModel.genre.map(m => m.path).join(',');
            //console.log(this.genreIDs);
            this._relatedVideoService.getRelatedVideos(this.genreIDs, '')
                .subscribe(result => {
                    //console.log(result);
                    this.relatedVideosList = [];
                    for (let asset of result.data)
                    {
                        if(asset.path != this._assetID) {
                            if (asset.orientation.length > 0) {
                                let isVisible = asset.orientation[0].is_visible;
                                let _t = asset.orientation[0].title;
                                /*let _img = asset.orientation[0].image == undefined ||
                                    asset.orientation[0].image.length == 0 ?
                                    defaultAssetThumbnail : asset.orientation[0].image;*/

                                let _img = asset.orientation[0].image;


                                if (isVisible && _t !== null) {
                                    let _p = asset.path;
                                    let _t = asset.orientation[0].title.trim().toLowerCase();
                                    _t = _t.replace(/\s+/g, '-');


                                    this.relatedVideosList.push(
                                        {
                                            'path': _p,
                                            'title': _t,
                                            'displayTitle': asset.orientation[0].title,
                                            'image': _img,
                                            'desc': asset.orientation[0].description,
                                            'duration': asset.duration
                                        });


                                }
                            }
                        }
                    }
                });
        }
    }

    bindSuggestedVideos()
    {
        if (this._videoDetailModel.primary_navigation.length > 0) {
            let _primaryNavigationId = this._videoDetailModel.primary_navigation[0].path;
            //console.log("_primaryNavigationId " + _primaryNavigationId);
            this._relatedVideoService.getSuggestedVideos(_primaryNavigationId)
                .subscribe(result => {
                    if (result.status) {
                        for (let asset of result.data) {
                            if(asset.path != this._assetID) {
                                if (asset.orientation.length > 0) {
                                    let isVisible = asset.orientation[0].is_visible;
                                    let _t = asset.orientation[0].title;
                                    /*let _img = asset.orientation[0].image == undefined ||
                                    asset.orientation[0].image.length == 0 ?
                                    defaultAssetThumbnail : asset.orientation[0].image;
                                    */
                                    let _img = asset.orientation[0].image;

                                    if (isVisible && _t !== null) {
                                        let _p = asset.path;
                                        let _t = asset.orientation[0].title.trim().toLowerCase();
                                        _t = _t.replace(/\s+/g, '-');


                                        this.suggestedVideosList.push(
                                            {
                                                'path': _p,
                                                'title': _t,
                                                'displayTitle': asset.orientation[0].title,
                                                'image': _img,
                                                'desc': asset.orientation[0].description,
                                                'duration': asset.duration

                                            });


                                    }
                                }
                            }
                        }
                    }
                });
        }
    }

    showRelatedVideos() {
        this.relatedVidVisible = true;
        this.suggestedVidVisible = false;
    }

    showSuggestedVideos() {
        this.relatedVidVisible = false;
        this.suggestedVidVisible = true;

    }

    bindBottomTabs () {
        this._assetService.getCastDetails(this._assetID)
        .subscribe(
            result => {

            this.castCrewDataFetched = true;
            this.bindBottomTabsClasses('comments');
            if(result.data != undefined)
                this.castCrewDetails = result.data;
            else
                this.castCrewDetails = [];
//             console.log(this.castCrewDetails);
            }
        );

        this.activateTab('comments');

    }

    bindBottomTabsClasses (activeTab) {
        this.castClass = "tabs__tab";
        this.commentsClass = "tabs__tab";
        this.reviewsClass = "tabs__tab";
        switch(activeTab) {
            case 'cast':
                this.castClass = "tabs__tab active"
                break;
            case 'comments':
                this.commentsClass = "tabs__tab active"
                break;
            case 'reviews':
                this.reviewsClass = "tabs__tab active"
                break;
        }

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

    activateTab(key: string) {
        this.activeTab = key;
    }

    tabChanged (event) {
        this.activeTab = event.tabTitle.toLowerCase();
        //console.log(event);
        if(event.tabTitle.toLowerCase() == 'reviews') {
            this.bindReviews();
        }

    }

    bindReviews() {
        if(this.reviews == undefined) {
            this.reviews = [];
            this.nothingLoading = false;
            this._assetService.getReviews(this._assetID,0,0)
            .subscribe(
                result => {
                this.reviews = result.data;
                this.nothingLoading = true;
                //console.log(result);
                }
            );
        }
    }

    bindPageTitle() {
        this.navigationSharedService.routerDataLoaded(this.videoTitle);
    }

    tabClicked(tabTitle) {
        this.activeTab = tabTitle.toLowerCase();
        if(tabTitle.toLowerCase() == 'reviews') {
            this.bindReviews();
        }

        this.bindBottomTabsClasses(tabTitle.toLowerCase());
    }
}