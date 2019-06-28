import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAssetlistingComponent } from './genreassetlisting.component';

describe('GenreassetlistingComponent', () => {
    let component: GenreAssetlistingComponent;
    let fixture: ComponentFixture<GenreAssetlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [GenreAssetlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(GenreAssetlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
