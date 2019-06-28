import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { NavigationModel } from '../../models/navigation';

@Injectable()
export class Navigationshared {

  // Observable string sources
  private sendNavigationLoadedSource = new Subject<NavigationModel>();
  private receiveNavigationLoadedSource = new Subject<NavigationModel>();

  private routerDataLoadedSource = new Subject<string>();

  private sendNavigationChangedSource = new Subject<string>();
  private receiveNavigationChangedSource = new Subject<string>();


  // Observable string streams
  sendNavigationLoaded$ = this.sendNavigationLoadedSource.asObservable();
  receiveNavigationLoaded$ = this.receiveNavigationLoadedSource.asObservable();

  routerDataLoaded$ = this.routerDataLoadedSource.asObservable();

  sendNavigationChanged$ = this.sendNavigationChangedSource.asObservable();
  receiveNavigationChanged$ = this.receiveNavigationChangedSource.asObservable();



  // Service message commands
  sendNavigationLoaded(navData: NavigationModel) {
    this.sendNavigationLoadedSource.next(navData);
  }

  receiveNavigationLoaded(navData: NavigationModel) {
    this.receiveNavigationLoadedSource.next(navData);
  }

  routerDataLoaded(title: string) {
    this.routerDataLoadedSource.next(title);
  }

  // Service message commands
  sendNavigationChanged(navData: string) {
    this.sendNavigationChangedSource.next(navData);
  }

  receiveNavigationChanged(navData: string) {
    this.receiveNavigationChangedSource.next(navData);
  }
}