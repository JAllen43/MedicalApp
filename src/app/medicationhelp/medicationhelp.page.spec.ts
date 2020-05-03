import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicationhelpPage } from './medicationhelp.page';

describe('MedicationhelpPage', () => {
  let component: MedicationhelpPage;
  let fixture: ComponentFixture<MedicationhelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationhelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicationhelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
