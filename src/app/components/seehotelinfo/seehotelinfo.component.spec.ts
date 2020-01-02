import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeehotelinfoComponent } from './seehotelinfo.component';

describe('SeehotelinfoComponent', () => {
  let component: SeehotelinfoComponent;
  let fixture: ComponentFixture<SeehotelinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeehotelinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeehotelinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
