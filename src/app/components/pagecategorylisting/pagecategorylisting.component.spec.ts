import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCategorylistingComponent } from './pagecategorylisting.component';

describe('PageCategorylistingComponent', () => {
    let component: PageCategorylistingComponent;
    let fixture: ComponentFixture<PageCategorylistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [PageCategorylistingComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(PageCategorylistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
