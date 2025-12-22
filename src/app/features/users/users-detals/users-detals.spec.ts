import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetals } from './users-detals';

describe('UsersDetals', () => {
  let component: UsersDetals;
  let fixture: ComponentFixture<UsersDetals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDetals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDetals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
