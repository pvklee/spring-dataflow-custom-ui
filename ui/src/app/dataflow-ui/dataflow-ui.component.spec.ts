import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataflowUiComponent } from './dataflow-ui.component';

describe('DataflowUiComponent', () => {
  let component: DataflowUiComponent;
  let fixture: ComponentFixture<DataflowUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataflowUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataflowUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
