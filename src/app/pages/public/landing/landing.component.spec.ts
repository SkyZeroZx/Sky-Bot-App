import { NgOptimizedImage } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import * as facebookPlugin from '../../../../assets/facebook-plugin/facebook';

fdescribe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgOptimizedImage],
      declarations: [LandingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate facebookPlugin', () => {
    const spyFacebookPlugin = spyOn(facebookPlugin, 'facebookPluginMessenger');
    component.ngAfterContentInit();
    expect(spyFacebookPlugin).toHaveBeenCalled();
  });
});
