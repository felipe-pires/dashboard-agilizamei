import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleByYearComponent } from './sale-by-year.component';

describe('SaleByYearComponent', () => {
  let component: SaleByYearComponent;
  let fixture: ComponentFixture<SaleByYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleByYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
