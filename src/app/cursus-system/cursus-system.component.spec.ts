import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusSystemComponent } from './cursus-system.component';

describe('CursusSystemComponent', () => {
  let component: CursusSystemComponent;
  let fixture: ComponentFixture<CursusSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursusSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
