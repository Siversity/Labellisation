import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarGaucheComponent } from './sidebar-gauche.component';

describe('SidebarGaucheComponent', () => {
  let component: SidebarGaucheComponent;
  let fixture: ComponentFixture<SidebarGaucheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarGaucheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarGaucheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
