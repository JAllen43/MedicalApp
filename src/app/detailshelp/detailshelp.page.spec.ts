import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailshelpPage } from './detailshelp.page';

describe('DetailshelpPage', () => {
  let component: DetailshelpPage;
  let fixture: ComponentFixture<DetailshelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailshelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailshelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
