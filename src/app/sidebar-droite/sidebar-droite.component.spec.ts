import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDroiteComponent } from './sidebar-droite.component';

describe('SidebarDroiteComponent', () => {
  let component: SidebarDroiteComponent;
  let fixture: ComponentFixture<SidebarDroiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarDroiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarDroiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
