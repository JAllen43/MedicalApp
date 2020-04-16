import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { $ } from 'protractor';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  user: any;
  retrieveData: any;
  index = 0;
  savedMedicine = [];
  add = true;
  determine: string;
  toggleswitch = "No";
  //
  medicines = [
    { "name": "blue inhaler", "desc": "Use it throughout the day", "toggleswitch": "No" },
    { "name": "brown inhaler", "desc": "Use it at the beginning and end of everyday", "toggleswitch": "No" }
  ];

  //
  onInfoPress(med) {
    this.index = this.medicines.indexOf(med)
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: med.desc

      }
    };
    this.router.navigate(['details'], navigationExtras);

  }

  //Alert to let the user know that they have entered a Drug that already exists on the application
  async medAlert() {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "Common Drug Entered",
      message: "Please enter a drug that is not currently on the screen",
      buttons: ['Dismiss']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);

  }

  onAddPress(med) {
    this.savedMedicine.push(med);
    console.log(this.savedMedicine);
  }



  //Alert for signing up new drug
  async newDrug() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'New Drug',
      //Gives input boxes to be used
      inputs: [
        {
          name: 'drugName',
          type: 'text',
          placeholder: 'Enter your drug name here'
        },
        {
          name: 'drugDesc',
          type: 'text',
          placeholder: 'Enter your drug description here'
        }],
      //Sets up "Ok" and "Cancel" Buttons to have desired effect when clicked on
      buttons: [{

        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel');
          this.determine = 'Cancel';
        }
      },
      {
        text: "Ok",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.determine = 'Ok';
        }
      }
      ],

    });
    await alert.present();
    let result = await alert.onDidDismiss();
    this.retrieveItem()
    console.log(result);
    console.log("This is the role: " + result.data.values.drugName);
    console.log("This is the first userLogins ", this.medicines);
    //Checks whether the "Ok" button was pressed. As a result it will enter the newEntry into the medicine array
    if (this.determine == "Ok") {
      let newEntry: any = new Object();
      newEntry["name"] = result.data.values.drugName;
      newEntry["desc"] = result.data.values.drugDesc;
      newEntry["toggleswitch"] = "No"
      //Checks whether this medicine is a duplicate or has no name, in which case an alert will be activated
      for (let med1 of this.medicines) {
        if (newEntry["name"] == med1["name"] || newEntry["name"] == "") {
          this.add = false;
          this.medAlert();
          break;
        }


      }
      if (this.add == true) {
        //newEntry pushed onto array
        this.medicines.push(newEntry);
        //Updated array is assigned to the user profile that is currently active
        for (let i of this.user) {
          console.log("This is medication: ", i["Medication"])
          i["Medication"] = this.medicines
          console.log("This is second medication: ", i["Medication"])
        }
      }
      console.log("This is the updated userLogins ", this.medicines);
    }



  }
  //Allows the user to toggle the switch and save medication into their own array
  toggled(med) {
    console.log("This is the array before: ", this.savedMedicine);

    //Scans array of medicine to find which switch has been activated
    for (let med1 of this.medicines) {
      console.log("This is med1 name:", med1["name"])
      if (med1["name"] == med) {
        console.log("This is the switches toggle:", med1["toggleswitch"])
        //Selects which action needs to be carried out depending on "Yes" or "No" decision
        if (med1["toggleswitch"] == "No") {
          med1["toggleswitch"] = "Yes";
          console.log("The switch is now on! ", med1)
          this.savedMedicine.push(med1);
        }
        else {
          med1["toggleswitch"] = "No";
          console.log("Med name is ", med1);
          this.index = this.savedMedicine.indexOf(med1);
          console.log(this.index);
          this.savedMedicine.splice(this.index, 1);
        }
      }
    }
    //Retrieves the user profile
    this.retrieveItem()
    //Goes through the user profile to separate the sections to save the required medication to the correct place
    for (let i of this.user) {
      i["trackedMedicine"] = this.savedMedicine
    }
    console.log("This is the user profile: ", this.user)
    //Saves recently updated user profile to local Storage
    this.saveItem(this.user)
  }

  saveItem(profile) {
    console.log(profile);
    localStorage.setItem("currentUser", JSON.stringify(profile));

  }

  retrieveItem() {
    this.retrieveData = localStorage.getItem("currentUser");
    console.log(this.retrieveData)
    this.user = JSON.parse(this.retrieveData);
    console.log(this.user);

  }

  isToggleOn() {
    console.log(this.toggleswitch);
  }

  constructor(private router: Router, public alertController: AlertController) { }

}
