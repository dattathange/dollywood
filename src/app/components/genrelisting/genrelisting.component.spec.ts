import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrelistingComponent } from './genrelisting.component';

describe('GenrelistingComponent', () => {
  let component: GenrelistingComponent;
  let fixture: ComponentFixture<GenrelistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenrelistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenrelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
