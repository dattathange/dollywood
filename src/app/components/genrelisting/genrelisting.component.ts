import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GenresService } from '../../globalservices/genres/genres.service';
import { GenresListing } from '../../models/genres-listing';
import {Navigationshared} from '../../globalservices/sharedservices/navigationshared.service'

@Component({
  //selector: 'app-genrelisting',
  templateUrl: './genrelisting.component.html',
  //styleUrls: ['./genrelisting.component.scss']
})
export class GenrelistingComponent implements OnInit {
    private router: Router;
    _urlParams: any;
    _genreListingModel: GenresListing;
    genreList: any[] = [];
    defaultImg: string;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
        private _genreService: GenresService,private navigationSharedService: Navigationshared)
    {
        this.router = _router;
        this._activatedRoute.params.subscribe(params => { this._urlParams = params });
        this.defaultImg = '/assets/images/default_image_genre.png';
    }

    ngOnInit() {

        this._genreService.getGenreList()
            .subscribe(
                result => {
                    //console.log(result);
                    this._genreListingModel = result;
                    this.bindGenres();
                }
            );

            this.navigationSharedService.receiveNavigationChanged('genres');

        
    }

    bindGenres() {
        for (let genre of this._genreListingModel.data)
        {
            let isVisible = genre.orientation[0].is_visible;
            let _t = genre.orientation[0].title;
            let _img = genre.orientation[0].image;

            if (isVisible && _t !== null) {
                let _p = genre.path;
                let _t = genre.orientation[0].title.trim().toLowerCase();
                _t = _t.replace(/\s+/g, '-');

                // carousalOptions.items = pc.data.length;
                this.genreList.push(
                    {
                        'path': _p,
                        'title': _t,
                        'displayTitle': genre.orientation[0].title,
                        'image': _img
                    });

                //console.log(carousalOptions);
            }
        }
    }

}
