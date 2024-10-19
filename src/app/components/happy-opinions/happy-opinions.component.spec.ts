import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyOpinionsComponent } from './happy-opinions.component';

describe('HappyOpinionsComponent', () => {
  let component: HappyOpinionsComponent;
  let fixture: ComponentFixture<HappyOpinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HappyOpinionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HappyOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
