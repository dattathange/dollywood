import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router'
import {Navigationshared} from '../../globalservices/sharedservices/navigationshared.service'

@Component({
  selector: 'app-footerpage',
  templateUrl: './footerpage.component.html',
  styleUrls: ['./footerpage.component.scss']
})
export class FooterpageComponent implements OnInit {

  pageName: string = '';
  constructor(private _router: Router, private activatedRoute: ActivatedRoute,
  private navigationSharedService: Navigationshared) {

    this.activatedRoute.params.subscribe(params => {
      this.pageName = params.name; 
      //console.log(params);
      navigationSharedService.routerDataLoaded(this.pageName);
        
    });
   }

    ngOnInit() {
        
        this.navigationSharedService.receiveNavigationChanged('footer');

        this._router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                window.scrollTo(0, 0);
                return;
            }
            else if (!(evt instanceof NavigationStart)) {
                window.scrollTo(0, 0);
                return;
            }
            
        });
  }

}
