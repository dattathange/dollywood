import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response, RequestOptions } from '@angular/http';

// All the RxJS stuff we need
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../../environments/environment';
import { httpOptions } from '../../configurations/configuration';
import { ApiRequestModel } from '../../models/apirequest';
import { Asset } from '../../models/asset';

@Injectable()
export class AssetsService {
    private navigationUrl: string;

    constructor(private _http: HttpClient)
    {
        this.navigationUrl = environment.baseURI + environment.apiURL + environment.assetDetailsAPI;
    }

    getAssetDetails(_path: string, _deviceType: string): Observable<Asset> {

        //return this.http.get(this.postUrl)
        //    .map(this.parseData)
        //    .catch(this.handleError);

        //console.log("inside getNavigations");
        //console.log(this.navigationUrl);

        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        //headers.append("Accept", 'application/json');


        let apiRequest = new ApiRequestModel();
        apiRequest.device_type = "WEB";
        apiRequest.path = _path;
        //console.log(JSON.stringify(apiRequest));

        return new Observable(ob => {

            //let objStorage = sessionStorage.getItem("setMenu")
            //let objStorageDateTime = sessionStorage.getItem("setMenuDateTime")

            //let objStorageDate = null;
            //let isExpire = true;
            //if (objStorageDateTime) {
            //    objStorageDate = new Date(JSON.parse(objStorageDateTime))
            //    if (objStorageDate > (new Date())) {
            //        isExpire = false;
            //    }
            //}
            //if (objStorage && !isExpire) {
            //    ob.next(JSON.parse(objStorage));
            //    ob.complete();
            //}
            //else {
            //    this._http.post<Asset>(
            //        this.navigationUrl,
            //        JSON.stringify(apiRequest), httpOptions)
            //        .subscribe((res) => {

            //            sessionStorage.setItem("setMenu", JSON.stringify(res));
            //            let currentDate = new Date();
            //            sessionStorage.setItem("setMenuDateTime", JSON.stringify((currentDate).setMinutes(currentDate.getMinutes() + 5)));
            //            ob.next(res);
            //            ob.complete();
            //        });
            //}

            this._http.post<Asset>(
                this.navigationUrl,
                JSON.stringify(apiRequest), httpOptions)
                .subscribe((res) => {

                    //sessionStorage.setItem("setMenu", JSON.stringify(res));
                    //let currentDate = new Date();
                    //sessionStorage.setItem("setMenuDateTime", JSON.stringify((currentDate).setMinutes(currentDate.getMinutes() + 5)));
                    ob.next(res);
                    ob.complete();
                });


        });
        
    }

    getCastDetails (assetId: string): Observable<any> {
        let castCrewUrl = environment.baseURI + environment.apiURL + 'getcastcrews';
        return this._http.post<any>(castCrewUrl, {
            "asset_id":assetId
            },httpOptions) 
            .catch((err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.error('An error occurred:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.error(`Backend returned code ${err.status}`);
              }
              return Observable.empty<any>();
            });

    }

    getReviews(assetId: string, skip: number, limit: number): Observable<any> {
        let reviewsUrl = environment.baseURI + environment.apiURL + 'getreviews';
        return this._http.post<any>(reviewsUrl, {
            "asset_id":assetId,
            'skip':skip,
            'limit':limit
            },httpOptions) 
            .catch((err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.error('An error occurred:', err.error.message);
              } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                console.error(`Backend returned code ${err.status}`);
              }
              return Observable.empty<any>();
            });
    }
}
