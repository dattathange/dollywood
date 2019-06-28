import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagecategoryComponent } from './pagecategory.component';

describe('PagecategoryComponent', () => {
  let component: PagecategoryComponent;
  let fixture: ComponentFixture<PagecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
