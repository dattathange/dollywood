import { Component, OnInit } from '@angular/core';
import {GlobalNavData} from '../../../utilities/globalNavigationData'
import {SearchService} from '../../../globalservices/search/search.service'
import { Router, ActivatedRoute } from '@angular/router';
import {defaultAssetImage} from '../../../configurations/configuration'
import { Navigationshared } from '../../../globalservices/sharedservices/navigationshared.service';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    searchResults: any[];
    globalNavData: GlobalNavData;
    defaultAssetImage: string = ''
    searchCount: any = 0;

    constructor(private searchService: SearchService,
    private activatedRoute: ActivatedRoute, private route: Router, private globalNavData1: GlobalNavData,
  private navigationSharedService: Navigationshared) { 
    this.globalNavData = globalNavData1;
    this.activatedRoute.params.subscribe(params => {
        this.fireSearch();  
        this.defaultAssetImage = defaultAssetImage;
    });

  }

  ngOnInit() {
    this.navigationSharedService.receiveNavigationChanged('search');
    this.fireSearch();
  }

  fireSearch() {
    if(this.globalNavData.searchQuery != undefined &&
    this.globalNavData.searchQuery.length != 0) {
      this.searchService.getSearchResults(this.globalNavData.searchQuery,'0','0')
      .subscribe(
          result => {
              this.searchCount = 0;
              this.searchResults = result.data;
              
              if(this.searchResults){
                this.searchCount = this.searchResults.length;
              }
          }
      );
    }
  }

  
  itemClicked(slide) {
    //console.log(slide);
    switch(slide.type) {
        case 'asset':
        let _t = slide.orientation[0].title.trim().toLowerCase();
        _t = _t.replace(/\s+/g, '-');
        this.route.navigate(['video/'+ _t + '/' + slide.path ]);
    }
  }

}
