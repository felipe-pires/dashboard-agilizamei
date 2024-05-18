import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorCreateComponent } from './fornecedor-create.component';

describe('FornecedorCreateComponent', () => {
  let component: FornecedorCreateComponent;
  let fixture: ComponentFixture<FornecedorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedorCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FornecedorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
