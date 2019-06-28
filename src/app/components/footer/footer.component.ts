import { Component, OnInit } from '@angular/core';
import {Navigationshared} from '../../globalservices/sharedservices/navigationshared.service'

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  //styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  disClaimerFlag:string="";
  currentYear:any;

  constructor(private navigationSharedService: Navigationshared,private cookieService: CookieService) { }

  ngOnInit() {

        this.currentYear=new Date().getFullYear();

        this.disClaimerFlag = this.cookieService.get('readDisclaimer');
        this.navigationSharedService.receiveNavigationChanged('footer');
  }

    setcookie(){
           this.cookieService.set( 'readDisclaimer', 'true' );
           this.disClaimerFlag = this.cookieService.get('readDisclaimer');

    }

}
