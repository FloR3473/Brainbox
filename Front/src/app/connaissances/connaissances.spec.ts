import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Connaissances } from './connaissances';

describe('Connaissances', () => {
  let component: Connaissances;
  let fixture: ComponentFixture<Connaissances>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Connaissances],
    }).compileComponents();

    fixture = TestBed.createComponent(Connaissances);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
