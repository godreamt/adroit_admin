import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOurTeamComponent } from './update-our-team.component';

describe('UpdateOurTeamComponent', () => {
  let component: UpdateOurTeamComponent;
  let fixture: ComponentFixture<UpdateOurTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOurTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOurTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
