import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingProductsByYearComponent } from './best-selling-products-by-year.component';

describe('BestSellingProductsByYearComponent', () => {
  let component: BestSellingProductsByYearComponent;
  let fixture: ComponentFixture<BestSellingProductsByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellingProductsByYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestSellingProductsByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
