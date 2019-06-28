import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {primNavigationKey, deviceTypeKey} from '../../configurations/configuration';
import {httpOptions} from '../../configurations/configuration';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {primaryNavigationModel} from '../../models/primary-navigation'



@Injectable()
export class PrimaryNavigationService {

  private primNavigationUrl: string;
  
  constructor(private http: HttpClient) { 
    this.primNavigationUrl = environment.baseURI + environment.apiURL + environment.primaryNavigationAPI;
  }

  getPrimaryNavigationData (path: string, productType: string): Observable<primaryNavigationModel> {
    
    return this.http.post<primaryNavigationModel>(this.primNavigationUrl, {
    "device_type":deviceTypeKey,
    "path":path
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

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

}
