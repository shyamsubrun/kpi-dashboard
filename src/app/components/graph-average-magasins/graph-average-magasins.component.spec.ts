import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAverageMagasinsComponent } from './graph-average-magasins.component';

describe('GraphAverageMagasinsComponent', () => {
  let component: GraphAverageMagasinsComponent;
  let fixture: ComponentFixture<GraphAverageMagasinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphAverageMagasinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphAverageMagasinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
