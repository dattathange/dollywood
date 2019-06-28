import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {primNavigationKey} from '../../configurations/configuration';
import {httpOptions} from '../../configurations/configuration';
import {httpOptionsImage} from '../../configurations/configuration';

import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import {primaryNavigationModel} from '../../models/primary-navigation'
import {favoriteItem} from '../../models/favoritesItem';

@Injectable()
export class AccountService {

  private getProfileUrl: string;
  private updateProfileUrl: string;
  private updateProfilePictureUrl: string;
  private removeProfilePictureUrl: string;
  
  constructor(private http: HttpClient) { 
    this.getProfileUrl = environment.baseURI + environment.apiURL + environment.getProfileURL;
    this.updateProfileUrl = environment.baseURI + environment.apiURL + environment.updateProfileURL;
    this.updateProfilePictureUrl = environment.baseURI + environment.apiURL + environment.updateProfilePictureURL;
    this.removeProfilePictureUrl = environment.baseURI + environment.apiURL + environment.removeProfilePictureURL;
    
  }

  getUserProfile (userId: string): Observable<any> {
    return this.http.post<any>(this.getProfileUrl, {
    "uid":userId
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

  updateUserProfile (profileData: any): Observable<any> {
    return this.http.post<any>(this.updateProfileUrl, profileData,httpOptions)
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

    updateUserProfilePicture (profileData: any,userId:any): Observable<any> {

          let headerData = new Headers();
          headerData.set('Content-Type', 'multipart/form-data');
          headerData.set('Accept', 'application/json');    

          let  _options = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' , 'Accept': 'application/json' }) };


        return this.http.post<any>(this.updateProfilePictureUrl+"?uid=" + userId, profileData,httpOptionsImage)
            .catch((err: HttpErrorResponse) => {
              //console.log(err);
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
                
    removeUserProfilePicture (userId: string): Observable<any> {
        return this.http.post<any>(this.removeProfilePictureUrl, {
          "user_id":userId
          }, httpOptions)
            .catch((err: HttpErrorResponse) => {
              //console.log(err);
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
