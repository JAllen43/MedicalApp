import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  value = 0;
  medicines = ["blue inhaler", "brown inhaler"];
  descriptions=["This is for use whenever you feel chesty", "This should be used at the start and end of everyday"];

  onButtonPress(med){
    console.log(med)
  }
  onInfoPress(index, med, medicines){
    index=medicines.indexOf(med)
    console.log(medicines[index])

  }

  onAddPress(){

  }
  constructor() {}

}