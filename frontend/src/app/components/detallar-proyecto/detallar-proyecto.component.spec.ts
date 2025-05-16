import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallarProyectoComponent } from './detallar-proyecto.component';

describe('DetallarProyectoComponent', () => {
  let component: DetallarProyectoComponent;
  let fixture: ComponentFixture<DetallarProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallarProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallarProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
