import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbookingsComponent } from './cbookings.component';

describe('CbookingsComponent', () => {
  let component: CbookingsComponent;
  let fixture: ComponentFixture<CbookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
