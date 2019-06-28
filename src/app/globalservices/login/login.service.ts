import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {httpOptions} from '../../configurations/configuration';
import { HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';


@Injectable()
export class LoginService {
  isLoggedIn:boolean;
  isLoggedInSubject = new Subject();
  constructor(private http: HttpClient) { 
     }

  getIsLoggedIn() {
    return sessionStorage.getItem('isLoggedIn');
  }

  setIsLoggedIn(value) {
    this.isLoggedInSubject.next(value);
    this.isLoggedIn = value;
    sessionStorage.setItem('isLoggedIn', value);
  }

  sendOtp( mobileNo: string, email: string) : Observable<any> {

    if(mobileNo != undefined && mobileNo.length > 0) {
        let sendOtpURL = environment.baseURI + environment.apiURL + "send/otp" + "?mobile=" + mobileNo;
      return this.http.get(sendOtpURL)
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
    else if(email != undefined && email.length > 0) {
        let sendOtpURL = environment.baseURI + environment.apiURL + "send/otp" + "?email=" + email;
      return this.http.get(sendOtpURL)
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

  verifyOtp(sessionId: string, otp: string, mobileNo: string, email: string) : Observable<any> {
    if(mobileNo != undefined && mobileNo.length > 0) {
        let sendOtpURL = environment.baseURI + environment.apiURL + "verify/otp" + "?mobile=" + mobileNo + "&otp=" + otp + "&session_id=" + sessionId;
      return this.http.get(sendOtpURL)
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
    else {
        let sendOtpURL = environment.baseURI + environment.apiURL + "verify/otp" + "?email=" + email + "&otp=" + otp;
      return this.http.get(sendOtpURL)
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

  socialLogin(mobile: string, email: string)  : Observable<any>{
    if(mobile != undefined && mobile.length > 0) {
      let socialLoginURL = environment.baseURI + environment.apiURL + "socialauth" + "?mobile=" + mobile + "&device_type=web";
      return this.http.get(socialLoginURL)
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
    else {
      let socialLoginURL = environment.baseURI + environment.apiURL + "socialauth" + "?email=" + email + "&device_type=web";
      return this.http.get(socialLoginURL)
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
}
