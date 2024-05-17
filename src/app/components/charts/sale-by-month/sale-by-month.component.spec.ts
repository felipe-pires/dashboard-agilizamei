import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByMonthComponent } from './sale-by-month.component';

describe('SaleByMonthComponent', () => {
  let component: SaleByMonthComponent;
  let fixture: ComponentFixture<SaleByMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleByMonthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
