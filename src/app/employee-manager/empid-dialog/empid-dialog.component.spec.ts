import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpidDialogComponent } from './empid-dialog.component';

describe('EmpidDialogComponent', () => {
  let component: EmpidDialogComponent;
  let fixture: ComponentFixture<EmpidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpidDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
