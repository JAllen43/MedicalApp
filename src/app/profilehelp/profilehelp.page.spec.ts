import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilehelpPage } from './profilehelp.page';

describe('ProfilehelpPage', () => {
  let component: ProfilehelpPage;
  let fixture: ComponentFixture<ProfilehelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilehelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilehelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
