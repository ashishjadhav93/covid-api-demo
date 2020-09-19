import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCountryInfoComponent } from './manage-country-info.component';

describe('ManageCountryInfoComponent', () => {
  let component: ManageCountryInfoComponent;
  let fixture: ComponentFixture<ManageCountryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCountryInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCountryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
