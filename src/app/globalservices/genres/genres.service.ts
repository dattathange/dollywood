import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from '@angular/http';

// All the RxJS stuff we need
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { httpOptions } from '../../configurations/configuration';
import { ApiRequestModel } from '../../models/apirequest';
import { GenresListing } from '../../models/genres-listing';
import { AssetListing } from '../../models/asset-listing';
import { GenreVideos } from '../../models/genre-videos';

@Injectable()
export class GenresService {
    private navigationUrl: string;
    private genreVideosUrl: string;

    constructor(private _http: HttpClient) {
        this.navigationUrl = environment.baseURI + environment.apiURL + environment.genreAPI;
        this.genreVideosUrl = environment.baseURI + environment.apiURL + environment.genreVideosAPI;
    }

    getGenreList(): Observable<GenresListing> {

        
        let apiRequest = new ApiRequestModel();
        apiRequest.device_type = "WEB";
        //console.log(JSON.stringify(apiRequest));

        return new Observable(ob => {
        
            this._http.post<GenresListing>(
                this.navigationUrl,
                JSON.stringify(apiRequest), httpOptions)
                .subscribe((res) => {

                    //sessionStorage.setItem("setMenu", JSON.stringify(res));
                    //let currentDate = new Date();
                    //sessionStorage.setItem("setMenuDateTime", JSON.stringify((currentDate).setMinutes(currentDate.getMinutes() + 5)));
                    ob.next(res);
                    ob.complete();
                });

        })

        
    }

    getGenreVideos(_genreId: number): Observable<GenreVideos> {

        let apiRequest = new ApiRequestModel();
        apiRequest.device_type = "WEB";
        apiRequest.genre_id = _genreId;
        
        //console.log(JSON.stringify(apiRequest));

        return new Observable(ob => {


            this._http.post<GenreVideos>(
                this.genreVideosUrl,
                JSON.stringify(apiRequest), httpOptions)
                .subscribe((res) => {

                    ob.next(res);
                    ob.complete();
                });


        });

    }
}
