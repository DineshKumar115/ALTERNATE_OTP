import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpGenerationComponent } from './otp-generation.component';

describe('OtpGenerationComponent', () => {
  let component: OtpGenerationComponent;
  let fixture: ComponentFixture<OtpGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpGenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
