import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialComponentsLibComponent } from './material-components-lib.component';

describe('MaterialComponentsLibComponent', () => {
  let component: MaterialComponentsLibComponent;
  let fixture: ComponentFixture<MaterialComponentsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialComponentsLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialComponentsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
