import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSystemComponent } from './skill-system.component';

describe('SkillSystemComponent', () => {
  let component: SkillSystemComponent;
  let fixture: ComponentFixture<SkillSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
