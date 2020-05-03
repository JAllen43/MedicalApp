import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackerhelpPage } from './trackerhelp.page';

describe('TrackerhelpPage', () => {
  let component: TrackerhelpPage;
  let fixture: ComponentFixture<TrackerhelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerhelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackerhelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
