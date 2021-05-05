import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPlasmaComponentComponent } from './request-plasma-component.component';

describe('RequestPlasmaComponentComponent', () => {
  let component: RequestPlasmaComponentComponent;
  let fixture: ComponentFixture<RequestPlasmaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPlasmaComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPlasmaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
