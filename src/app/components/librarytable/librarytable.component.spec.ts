import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarytableComponent } from './librarytable.component';

describe('LibrarytableComponent', () => {
  let component: LibrarytableComponent;
  let fixture: ComponentFixture<LibrarytableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrarytableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
