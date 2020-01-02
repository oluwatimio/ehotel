import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomernamedialogComponent } from './customernamedialog.component';

describe('CustomernamedialogComponent', () => {
  let component: CustomernamedialogComponent;
  let fixture: ComponentFixture<CustomernamedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomernamedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomernamedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
