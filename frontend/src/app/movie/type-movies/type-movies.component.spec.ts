import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeMoviesComponent } from './type-movies.component';

describe('TypeMoviesComponent', () => {
  let component: TypeMoviesComponent;
  let fixture: ComponentFixture<TypeMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeMoviesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
