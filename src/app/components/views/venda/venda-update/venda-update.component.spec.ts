import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaUpdateComponent } from './venda-update.component';

describe('VendaUpdateComponent', () => {
  let component: VendaUpdateComponent;
  let fixture: ComponentFixture<VendaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendaUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
