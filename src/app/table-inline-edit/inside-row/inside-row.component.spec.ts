/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InsideRowComponent } from './inside-row.component';

describe('InsideRowComponent', () => {
  let component: InsideRowComponent;
  let fixture: ComponentFixture<InsideRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsideRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsideRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
