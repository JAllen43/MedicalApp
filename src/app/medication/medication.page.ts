import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-medication',
  templateUrl: './medication.page.html',
  styleUrls: ['./medication.page.scss'],
})
export class MedicationPage implements OnInit {
  decision: boolean;
  medication: any = [];
  currentUser: any = [];
  variable: any;
  add: boolean;
  index: number;
  lock: boolean;
  saveArray: any = [];
  counter: number;

  constructor(private storage: Storage, private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    this.retrieveAndSetMedication()

  }

  //Used to give a time delay in order for components to be retrieved from local storage before being updated
  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Used to retrieve information from the user profile and set it to the medication to be displayed on the screen
  async retrieveAndSetMedication() {
    this.storage.get("currentUser").then((result) => {
      this.currentUser = result
    })

    await this.delay(50);

    for (let element of this.currentUser) {
      this.medication = element["Medication"]
    }
  }

  //Allow sign up box for new drug to be displayed to the user for a medication to be added to the application
  async signUpNewDrug() {
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
          this.decision = false;
        }
      },
      {
        text: "Ok",
        role: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.decision = true;
        }
      }
      ],

    });
    await alert.present();
    let result = await alert.onDidDismiss();
    this.addNewEntry(result)
  }

  //Presents an alert with a specified header, subHeader and Message
  async alertPresent(header, subHeader, msg) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: msg,
      buttons: ['Dismiss']
    });

    await alert.present();
    let result = await alert.onDidDismiss();

  }
  //Adding a new entry to the medication list in the user profile
  addNewEntry(result) {
    this.add = true
    //Checks whether the "Ok" button was pressed. As a result it will enter the newEntry into the medicine array
    if (this.decision == true) {
      let newEntry: any = new Object();
      newEntry["name"] = result.data.values.drugName;
      newEntry["desc"] = result.data.values.drugDesc;
      newEntry["togglestate"] = false
      newEntry["timerTime"] = new Date();
      //Checks whether this medicine is a duplicate or has no name, in which case an alert will be activated
      for (let med of this.medication) {
        if (newEntry["name"] == med["name"] || newEntry["name"] == "") {
          this.add = false;
          this.alertPresent("Alert", "Common Drug Entered", "Please enter a drug that is not currently on the screen")
          break;
        }
        else {
          this.add = true;
        }
      }
      if (this.add == true) {
        //newEntry pushed onto array
        this.medication.push(newEntry);
        //Updated array is assigned to the user profile that is currently active
        for (let element of this.currentUser) {
          element["Medication"] = this.medication
        }
        this.onSave("currentUser", this.currentUser)
      }
    }
  }

  //Alert for signing up new drug
  newDrug() {
    this.onRetrieveCurrentUser()
    this.signUpNewDrug()
  }


  //Save information to local storage
  onSave(location, value) {
    this.storage.set(location, value)
  }

  //Saves current user to the local storage
  onSaveCurrentUser() {
    this.storage.set("currentUser", this.currentUser)
  }

  //Retrieves items from a determined location (represented by location) and a set value (determined by the result)
  async onRetrieveCurrentUser() {
    this.storage.get("currentUser").then((result) => {
      this.currentUser = result
      this.counter = 1;
      return this.currentUser
    })
  }

  //Pressing the Information button will redirect the user to a page which has more information on the drug
  onInfoPress(med) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: med
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }

  //On the add button being pressed it adds the intended medication to the trackedmedicine array
  onAddPress(med) {
    this.onRetrieveCurrentUser()
    this.lock = true;
    for (let element of this.medication) {
      if (med == element["name"]) {
        for (let section of this.currentUser) {
          for (let part of section["trackedMedicine"]) {
            if (med == part["name"]) {
              this.lock = false
            }
          }
          if (this.lock == true) {
            section["trackedMedicine"].push(element)
            this.onSaveCurrentUser()
          }
        }
      }
    }
    this.onSaveCurrentUser()
    this.onRetrieveCurrentUser()
  }

  //Removes relevant medication from the current user's medication list and profile
  removeMed(med) {
    this.onRetrieveCurrentUser()
    for (let element of this.currentUser) {
      for (let section of element["Medication"]) {
        if (section["name"] == med) {
          this.index = element["Medication"].indexOf(section);
          element["Medication"].splice(this.index, 1);
          this.medication = element["Medication"];
        }
      }
      for (let i of this.currentUser) {
        i["Medication"] = element["Medication"]
      }
    }
    this.onSaveCurrentUser()
  }
}