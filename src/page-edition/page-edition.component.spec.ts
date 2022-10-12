import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditionComponent } from './page-edition.component';

describe('PageEditionComponent', () => {
  let component: PageEditionComponent;
  let fixture: ComponentFixture<PageEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
