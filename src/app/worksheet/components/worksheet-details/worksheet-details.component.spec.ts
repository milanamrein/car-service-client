import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetDetailsComponent } from './worksheet-details.component';

describe('WorksheetDetailsComponent', () => {
  let component: WorksheetDetailsComponent;
  let fixture: ComponentFixture<WorksheetDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
