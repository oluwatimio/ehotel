import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchainComponent } from './addchain.component';

describe('AddchainComponent', () => {
  let component: AddchainComponent;
  let fixture: ComponentFixture<AddchainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddchainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
