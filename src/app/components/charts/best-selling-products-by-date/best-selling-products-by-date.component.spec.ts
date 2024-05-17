import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingProductsByDateComponent } from './best-selling-products-by-date.component';

describe('BestSellingProductsByDateComponent', () => {
  let component: BestSellingProductsByDateComponent;
  let fixture: ComponentFixture<BestSellingProductsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellingProductsByDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestSellingProductsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
