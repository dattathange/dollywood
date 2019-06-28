import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions } from '@angular/http';

// All the RxJS stuff we need
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { httpOptions } from '../../configurations/configuration';
import { NavigationModel } from '../../models/navigation';
import { ApiRequestModel } from '../../models/apirequest';

@Injectable()
export class NavigationService {
    private navigationUrl: string;
    
    constructor(private _http: HttpClient)
    {
        this.navigationUrl = environment.baseURI + environment.apiURL + environment.navigationAPI;
    }
    
    getNavigations(): Observable<NavigationModel> {
    
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
        //console.log(JSON.stringify(apiRequest));
        
        return new Observable(ob => {
            
            //let objStorage = sessionStorage.getItem("setMenu")
            //let objStorageDateTime = sessionStorage.getItem("setMenuDateTime")

            //let objStorageDate = null;
            //let isExpire = true;
            //if (objStorageDateTime) {
            //    objStorageDate = new Date(JSON.parse(objStorageDateTime))
            //    if (objStorageDate > (new Date()))
            //    {
            //        isExpire = false;
            //    }
            //}
            //if (objStorage && !isExpire)
            //{
            //    ob.next(JSON.parse(objStorage));
            //    ob.complete();
            //}
            //else {
            //    this._http.post<NavigationModel>(
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
            
            this._http.post<NavigationModel>(
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
       


        //return this.http.post(
        //        this.postUrl,
        //        JSON.stringify(apiRequest), {
        //            headers: headers
        //        })
        //    //.map(this.parseData)
        //    .map(res => res.json())
            //.catch(this.handleError);

    }

    // This method parses the data to JSON
    private parseData(res: any) {
        //console.log("parseData");
         
        return res;
    }

    // Displays the error message
    private handleError(error: any) {
        let errorMessage: string;

        errorMessage = error.message ? error.message : error.toString();

        // In real world application, call to log error to remote server
        // logError(error);

        // This returns another Observable for the observer to subscribe to
    //    console.log("errorMessage -- " + errorMessage);
        
        return Observable.throw(error.json().error);
    }
}
