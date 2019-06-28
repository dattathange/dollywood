import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class Loginshared {

  // Observable string sources
  private sendUserLoggedInSource = new Subject<string>();
  private receiveUserLoggedInSource = new Subject<string>();

  // Observable string streams
  sendUserLoggedIn$ = this.sendUserLoggedInSource.asObservable();
  receiveUserLoggedIn$ = this.receiveUserLoggedInSource.asObservable();


  // Service message commands
  sendUserLoggedIn(message: string) {
    this.sendUserLoggedInSource.next(message);
  }

  receiveUserLoggedIn(message: string) {
    this.receiveUserLoggedInSource.next(message);
  }
}