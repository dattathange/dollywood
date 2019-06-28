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
import { AssetListing } from '../../models/asset-listing';

@Injectable()
export class RelatedvideosService {

    private navigationUrl: string;
    private suggestedVideosUrl: string;

    constructor(private _http: HttpClient) {
        this.navigationUrl = environment.baseURI + environment.apiURL + environment.relatedVideosAPI;
        this.suggestedVideosUrl = environment.baseURI + environment.apiURL + environment.suggestedVideosAPI;
    }

    getRelatedVideos(_genre: string, _language: string): Observable<AssetListing> {

        let apiRequest = new ApiRequestModel();
        apiRequest.device_type = "WEB";
        apiRequest.genre = _genre;
        apiRequest.language = _language;
        //console.log(JSON.stringify(apiRequest));

        return new Observable(ob => {


            this._http.post<AssetListing>(
                this.navigationUrl,
                JSON.stringify(apiRequest), httpOptions)
                .subscribe((res) => {

                    ob.next(res);
                    ob.complete();
                });


        });

    }

    getSuggestedVideos(_primaryNavigation: string): Observable<AssetListing> {

        let apiRequest = new ApiRequestModel();
        apiRequest.device_type = "WEB";
        apiRequest.primary_navigation = _primaryNavigation;
        

        return new Observable(ob => {


            this._http.post<AssetListing>(
                this.suggestedVideosUrl,
                JSON.stringify(apiRequest), httpOptions)
                .subscribe((res) => {

                    ob.next(res);
                    ob.complete();
                });


        });

    }
}
