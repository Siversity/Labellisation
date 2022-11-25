import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeImageComponent } from './liste-image.component';

describe('ListeImageComponent', () => {
  let component: ListeImageComponent;
  let fixture: ComponentFixture<ListeImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
