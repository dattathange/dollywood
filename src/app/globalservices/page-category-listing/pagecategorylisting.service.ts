import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from '@angular/http';

// All the RxJS stuff we need
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { httpOptions } from '../../configurations/configuration';
import { ApiRequestModel } from '../../models/apirequest';
import { PageCategoryListing } from '../../models/page-category-listing';

@Injectable()
export class PageCategoryListingService {
    private navigationUrl: string;
    
    constructor(private _http: HttpClient)
    {
        this.navigationUrl = environment.baseURI + environment.apiURL + environment.pageCategoryListingAPI;
    }

    getPageCategoryListing(_path: string, _deviceType: string, _type: string, _limit: number, _skip: number)
        : Observable<PageCategoryListing> {

        //return this.http.get(this.postUrl)
        //    .map(this.parseData)
        //    .catch(this.handleError);

        //console.log("inside getNavigations");
        //console.log(this.navigationUrl);

        //let headers = new Headers();
        //headers.append('Content-Type', 'application/json');
        //headers.append("Accept", 'application/json');

        
        let apiRequest = new ApiRequestModel();
        apiRequest.device_type = _deviceType;
        apiRequest.path = _path;
        //apiRequest.type = _type;
    //    console.log(JSON.stringify(apiRequest));

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

            this._http.post<PageCategoryListing>(
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
}
