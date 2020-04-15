import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  displayArray: any = [];
  user: any;
  retrieveData: any;




  //Updates the Tracker list to show which medications are to be tracked
  updateItems() {
    this.retrieveItem()
    for (let element of this.user) {
      console.log("This is the element: ", element)
      console.log("This is the tracked Medication of element:", element["trackedMedicine"])
      this.displayArray = element["trackedMedicine"]
      console.log(this.displayArray)

    }
  }

  //Used to retrieve the current user and the relevant data from local Storage
  retrieveItem() {
    this.retrieveData = localStorage.getItem("currentUser");
    console.log(this.retrieveData)
    this.user = JSON.parse(this.retrieveData);
    console.log("This is current user: ", this.user);

  }


}
