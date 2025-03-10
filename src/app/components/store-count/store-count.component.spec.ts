import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCountComponent } from './store-count.component';

describe('StoreCountComponent', () => {
  let component: StoreCountComponent;
  let fixture: ComponentFixture<StoreCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
