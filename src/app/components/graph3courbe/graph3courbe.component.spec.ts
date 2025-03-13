import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Graph3courbeComponent } from './graph3courbe.component';

describe('Graph3courbeComponent', () => {
  let component: Graph3courbeComponent;
  let fixture: ComponentFixture<Graph3courbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graph3courbeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Graph3courbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
