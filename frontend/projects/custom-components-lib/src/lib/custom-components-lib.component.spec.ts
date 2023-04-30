import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomComponentsLibComponent } from './custom-components-lib.component';

describe('CustomComponentsLibComponent', () => {
  let component: CustomComponentsLibComponent;
  let fixture: ComponentFixture<CustomComponentsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomComponentsLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomComponentsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
