import { Component, OnInit, Input, SimpleChange, OnChanges, EventEmitter, Output } from '@angular/core';
import {carousal} from '../../models/carousal'
import { navigationClickData } from '../../models/navigation-click-data';
import { defaultAssetImage } from '../../configurations/configuration';

import { trigger, state, animate, transition, style } from '@angular/animations';
import { fadeInAnimation } from '../../_animations/anime1';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.scss'],
    animations: [
        fadeInAnimation
    ],
    host: { '[@fadeInAnimation]': '' }
})
export class CarousalComponent implements OnInit, OnChanges {

  @Input() data: carousal[];
  clickedPath: string;
  clickedType: string;
  @Output() public onNavigationClicked = new EventEmitter<navigationClickData>();

  constructor(private router: Router) {

  }

  ngOnInit() {
    //console.log('in ng init')
    //console.log('carousaldata is ')
    //console.log(this.data);
  }

  slides = [
  ];
  slideConfig = { dots: false,
    autoplay: false,
    initialSlide: 3,
    infinite: true,
    autoplaySpeed: 3000
  };

    afterChange(e) {
      //console.log('afterChange');
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
      let log: string[] = [];
      if (changes['data'])
      {
        this.slides = [];
        if(this.data) {
          for (let entry of this.data) 
            {
              let itemURL = '';
              switch(entry.type) {
                case 'asset':
                
                let _t = entry.orientation[0].title.trim().toLowerCase();
                _t = _t.replace(/\s+/g, '-');

                itemURL = 'video/' + _t + '/' + entry.path;
              //  console.log(itemURL);
                break;
              }

              if(entry.orientation[0].is_visible) {
                let imgURL = entry.orientation[0].image;
                if(imgURL == undefined || imgURL.length == 0)
                  imgURL = defaultAssetImage;

                let tmpSlide = {'img':imgURL, 'path': entry.path, 
                'type':entry.type, 'label': entry.orientation[0].label,
                'title':entry.orientation[0].title,
                'description':entry.orientation[0].description,'url':itemURL,
                'is_visible':entry.orientation[0].is_visible};


                if(tmpSlide.label == undefined || tmpSlide.label.length ==0)
                  tmpSlide.label = tmpSlide.title;

                this.slides.push(tmpSlide);
              }

                
            }
        }
          //console.log(this.slides);
      }
    }

    slideClicked(path:string, type:string) {
   //   console.log('slide clicked');
      this.clickedPath = path;
      this.clickedType = type;
      let navigationData: navigationClickData = new navigationClickData;
      navigationData.path = path;
      navigationData.type = type;

      this.onNavigationClicked.emit(navigationData);
    }

    goToPage(slide) {
      this.router.navigate([slide.url])
    }
}
 