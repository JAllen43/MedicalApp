import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginhelpPage } from './loginhelp.page';

describe('LoginhelpPage', () => {
  let component: LoginhelpPage;
  let fixture: ComponentFixture<LoginhelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginhelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginhelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
