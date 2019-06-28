import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {primNavigationKey} from '../../configurations/configuration';
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
export class WatchlistService {

    private watchListUrl: string;
    private addToWatchListUrl: string;

    constructor(private http: HttpClient) { 
        this.watchListUrl = environment.baseURI + environment.apiURL + environment.watchListURL;
        this.addToWatchListUrl = environment.baseURI + environment.apiURL + environment.addToWatchListURL;
    }

    getUserWatchList (userId: string): Observable<favoriteItem> {
        return this.http.post<favoriteItem>(this.watchListUrl, {
        "user_id":userId
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

    addUserWatchList(userId: string, assetId: string): Observable<any> {
        return this.http.post<any>(this.addToWatchListUrl, {
            "user_id": userId,
            "asset_id": assetId
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

}
