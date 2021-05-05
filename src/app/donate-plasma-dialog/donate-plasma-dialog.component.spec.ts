import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatePlasmaDialogComponent } from './donate-plasma-dialog.component';

describe('DonatePlasmaDialogComponent', () => {
  let component: DonatePlasmaDialogComponent;
  let fixture: ComponentFixture<DonatePlasmaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatePlasmaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatePlasmaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
