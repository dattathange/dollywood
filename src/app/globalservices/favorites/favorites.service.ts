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
export class FavoritesService {

    private favoriteUrl: string;
    private addToFavUrl: string;
    private removeFromFavUrl: string;
  
  constructor(private http: HttpClient) { 
      this.favoriteUrl = environment.baseURI + environment.apiURL + environment.favoritesURL;
      this.addToFavUrl = environment.baseURI + environment.apiURL + environment.addToFavouritesURL;
      this.removeFromFavUrl = environment.baseURI + environment.apiURL + environment.removeFromFavouritesURL;
  }

  getUserFavorites (userId: string): Observable<favoriteItem> {
    return this.http.post<favoriteItem>(this.favoriteUrl, {
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

    addUserFavourites(userId: string, assetId: string): Observable<any> {
        return this.http.post<any>(this.addToFavUrl, {
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

    removeUserFavorite(userId: string, assetId: string) {
      return this.http.post<any>(this.removeFromFavUrl, {
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
