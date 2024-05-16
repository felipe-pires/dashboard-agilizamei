import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaDeleteComponent } from './venda-delete.component';

describe('VendaDeleteComponent', () => {
  let component: VendaDeleteComponent;
  let fixture: ComponentFixture<VendaDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendaDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
