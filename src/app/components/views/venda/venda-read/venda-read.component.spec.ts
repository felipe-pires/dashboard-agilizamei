import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaReadComponent } from './venda-read.component';

describe('VendaReadComponent', () => {
  let component: VendaReadComponent;
  let fixture: ComponentFixture<VendaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendaReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
