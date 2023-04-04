import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageLogedComponent } from './homepage-loged.component';

describe('HomepageLogedComponent', () => {
  let component: HomepageLogedComponent;
  let fixture: ComponentFixture<HomepageLogedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageLogedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageLogedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
