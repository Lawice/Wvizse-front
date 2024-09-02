import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSystemComponent } from './card-system.component';

describe('CardSystemComponent', () => {
    let component: CardSystemComponent;
    let fixture: ComponentFixture<CardSystemComponent>;
  
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardSystemComponent]
        })
        .compileComponents();
  
        fixture = TestBed.createComponent(CardSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
  
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
