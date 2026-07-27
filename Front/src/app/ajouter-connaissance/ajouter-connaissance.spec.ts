import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterConnaissance } from './ajouter-connaissance';

describe('AjouterConnaissance', () => {
  let component: AjouterConnaissance;
  let fixture: ComponentFixture<AjouterConnaissance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterConnaissance],
    }).compileComponents();

    fixture = TestBed.createComponent(AjouterConnaissance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
