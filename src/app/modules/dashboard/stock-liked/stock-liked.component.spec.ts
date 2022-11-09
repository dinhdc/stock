import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLikedComponent } from './stock-liked.component';

describe('StockLikedComponent', () => {
  let component: StockLikedComponent;
  let fixture: ComponentFixture<StockLikedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockLikedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
