import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Barside } from './barside';

describe('Barside', () => {
  let component: Barside;
  let fixture: ComponentFixture<Barside>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Barside],
    }).compileComponents();

    fixture = TestBed.createComponent(Barside);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
