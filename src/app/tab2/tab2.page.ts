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
  value = 0;
  addmedicine = "";
  adddescription = "";
  savedMedicine = [];
  add = true;
  determine: string;
  yellow = "Hallelujah";
  toggleswitch = "No";
  index=0;
  //
  medicines = [
    { "name": "blue inhaler", "desc": "Use it throughout the day", "toggleswitch": "No" },
    { "name": "brown inhaler", "desc": "Use it at the beginning and end of everyday", "toggleswitch": "No" }
  ];
  
  //
  onButtonPress(med) {
    console.log(med)
  }
  onInfoPress(index, med, medicines, descriptions) {
    index = this.medicines.indexOf(med)
    console.log(medicines[index])
    console.log(descriptions[index])
    console.log(descriptions);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: med.desc

      }
    };
    this.router.navigate(['details'], navigationExtras);

  }


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
    console.log(result);
    console.log("This is the role: " + result.data.values.drugName);
    console.log("This is the first userLogins ", this.medicines);
    if (this.determine == "Ok") {
      let newEntry: any = new Object();
      newEntry["name"] = result.data.values.drugName;
      newEntry["desc"] = result.data.values.drugDesc;
      for (let med1 of this.medicines) {
        if (newEntry["name"] == med1["name"] || newEntry["name"] == "") {
          this.add = false;
          this.medAlert();
          break;
        }


      }
      if (this.add == true) {
        this.medicines.push(newEntry);
      }
      console.log("This is the updated userLogins ", this.medicines);
    }



  }

  testing(med) {
    console.log("This is the array before: ", this.savedMedicine);
    
    //this.savedName=med.name;
    for (let med1 of this.medicines) {
      if (med1["name"] == med) {
        console.log("This is the switches toggle: ", med1["toggleswitch"])
        if (med1["toggleswitch"] == "No") {
          med1["toggleswitch"] = "Yes";
          console.log("The switch is now on! ", med1)
          this.savedMedicine.push(med1);
          
        }
        else {
          med1["toggleswitch"] = "No";
          console.log("Med name is ", med1);
          this.index=this.savedMedicine.indexOf(med1);
          console.log(this.index);
          this.savedMedicine.splice(this.index, 1);
        }
      }
    }
    console.log("This is the array after: ", this.savedMedicine);



  }


  isToggleOn() {
    console.log(this.toggleswitch);
  }

  constructor(private router: Router, public alertController: AlertController) { }

}
