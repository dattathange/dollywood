import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-choose-language',
  templateUrl: './choose-language.component.html',
  styleUrls: ['./choose-language.component.scss']
})
export class ChooseLanguageComponent implements OnInit {
  selected_language: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
      this.activatedRoute.params.subscribe(params => {
              
        let language = sessionStorage.getItem('language');
        if (language !== undefined && language != null) {
            this.selected_language = language;
        } else {
            this.selected_language = 'en';
        }
      });
   }

  ngOnInit() {
  }
  goToHome(selectedLangauge) {
    sessionStorage.setItem('language', selectedLangauge);
    let language = sessionStorage.getItem('language');

    this.selected_language = language;
    this.router.navigate(['/user/login']);
  }

}
