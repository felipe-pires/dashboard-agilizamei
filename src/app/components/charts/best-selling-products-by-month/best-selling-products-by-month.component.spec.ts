import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingProductsByMonthComponent } from './best-selling-products-by-month.component';

describe('BestSellingProductsByMonthComponent', () => {
  let component: BestSellingProductsByMonthComponent;
  let fixture: ComponentFixture<BestSellingProductsByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellingProductsByMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestSellingProductsByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
