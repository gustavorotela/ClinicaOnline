import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificacionComponent } from './modificacion.component';

describe('ModificacionComponent', () => {
  let component: ModificacionComponent;
  let fixture: ComponentFixture<ModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
