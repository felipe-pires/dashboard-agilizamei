import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGainsAndCostsComponent } from './total-gains-and-costs.component';

describe('TotalGainsAndCostsComponent', () => {
  let component: TotalGainsAndCostsComponent;
  let fixture: ComponentFixture<TotalGainsAndCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalGainsAndCostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalGainsAndCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
