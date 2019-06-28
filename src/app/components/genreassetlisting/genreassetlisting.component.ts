import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GenresService } from '../../globalservices/genres/genres.service';
import { GenreVideos } from '../../models/genre-videos';
import {Navigationshared} from '../../globalservices/sharedservices/navigationshared.service'
import { Meta } from '@angular/platform-browser';

@Component({
  //selector: 'app-genreassetlisting',
  templateUrl: './genreassetlisting.component.html',
  styleUrls: ['./genreassetlisting.component.scss']
})
export class GenreAssetlistingComponent implements OnInit {
    private router: Router;
    _urlParams: any;
    private _genreId: string;
    _genreVideosModel: GenreVideos;
    defaultImg: string;
    assetsList: any[] = [];
    genreName: string;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
        private _genreVideosService: GenresService,
        private navigationSharedService: Navigationshared,
        private meta: Meta) {
        this.router = _router;
        this._activatedRoute.params.subscribe(params => { this._urlParams = params });
        this.defaultImg = '/assets/images/default_image.png';
    }

    ngOnInit()
    {
        this.navigationSharedService.receiveNavigationChanged('genreassetlisting');

        if (this._urlParams != null)
        {
            this._genreId = this._urlParams['id'];
        }
    //    console.log("this._genreId : " + this._genreId);
        this._genreVideosService.getGenreVideos(+this._genreId)
            .subscribe(
                result => {
                    //console.log(result);
                    this._genreVideosModel = result;
                    this.genreName = this._genreVideosModel.orientation[0].title;

                    for (let assets of this._genreVideosModel.data) {
                        if (assets.orientation.length > 0) {
                            let isVisible = assets.orientation[0].is_visible;
                            let _t = assets.orientation[0].title;
                            let _img = assets.orientation[0].image;

                            if (isVisible && _t !== null) {
                                let _p = assets.path;
                                let _t = assets.orientation[0].title.trim().toLowerCase();
                                _t = _t.replace(/\s+/g, '-');


                                this.assetsList.push(
                                    {
                                        'path': _p,
                                        'title': _t,
                                        'displayTitle': assets.orientation[0].title,
                                        'image': _img,
                                        'desc': assets.orientation[0].description,
                                        'duration': assets.duration
                                    });


                            }
                        }

                    }

                    this.bindMetaData(result);
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

    
}
