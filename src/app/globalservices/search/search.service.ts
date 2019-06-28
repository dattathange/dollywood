import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {primNavigationKey, deviceTypeKey} from '../../configurations/configuration';
import {httpOptions} from '../../configurations/configuration';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/Rx';
import {primaryNavigationModel} from '../../models/primary-navigation'
import {favoriteItem} from '../../models/favoritesItem';


@Injectable()
export class SearchService {


  private searchUrl: string;
  private addToSearchUrl: string;
  stored_assets:any;

  constructor(private http: HttpClient) {
    this.searchUrl = environment.baseURI + environment.apiURL + environment.searchUrl;
    this.addToSearchUrl = environment.baseURI + environment.apiURL + environment.addToSearchURL;
  }

  getSearchResults (searchTerm: string, skip: string, limit: string ): Observable<any> {


    let searchURL = this.searchUrl + "?string=" + searchTerm + "&limit=" + limit + "&device_type=" + deviceTypeKey ;
      return this.http.get(searchURL)
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

  addSearchResults(searchTerm: string): Observable<any> {

        //pass the logged in user for asset info
        let uid = sessionStorage.getItem('ud');
        if (uid !== undefined && uid != null) {
           let user_id = uid;
        }

        return this.http.post<any>(this.addToSearchUrl, {
            "user_id": uid,
            "search_term":searchTerm
        }, httpOptions)
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

    getLatestStoredSearchResults (searchTerm: string, skip: string, limit: string ): Observable<any> {

        //pass the logged in user for asset info
        let uid = sessionStorage.getItem('ud');
        if (uid !== undefined && uid != null) {
           let user_id = uid;
        } else {
            //if user is not logged in
            this.stored_assets = sessionStorage.getItem('stored_assets');
        }

        let searchURL = this.searchUrl + "?stored_result=true&string=%20&limit=" + limit + "&device_type=" + deviceTypeKey + "&user_id=" + uid + "&stored_assets=" + this.stored_assets;
          return this.http.get(searchURL)
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
