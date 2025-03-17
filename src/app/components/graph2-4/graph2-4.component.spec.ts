import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph24Component } from './graph2-4.component';

describe('Graph24Component', () => {
  let component: Graph24Component;
  let fixture: ComponentFixture<Graph24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graph24Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Graph24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
