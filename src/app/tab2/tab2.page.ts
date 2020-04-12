import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  value = 0;
  addmedicine="";
  adddescription="";
  savedMedicine=[];
  add=true;
  determine: string;
  //
  medicines = [
      {"name":"blue inhaler", "desc":"Use it throughout the day"},
      {"name": "brown inhaler", "desc":"Use it at the beginning and end of everyday"}
    ];
  descriptions = ["This is for use whenever you feel chesty", "This should be used at the start and end of everyday"];
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

  
  async medAlert(){
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

    //for (let med of this.medicines){
    //  if ()
    //}
    //let med:any = new Object();
    //med["name"] = {{med.name}};
    //med["desc"] = med;
    //this.savedMedicine.push(med)
    //console.log("The updated saved array is: ", this.savedMedicine)
    //
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
    for (let med1 of this.medicines){
      if(newEntry["name"]==med1["name"] || newEntry["name"]==""){
        this.add=false;
        this.medAlert();
        break;
      }


    }
    if(this.add==true){
      this.medicines.push(newEntry);
    }
    console.log("This is the updated userLogins ", this.medicines);
  }



}




  constructor(private router: Router, public alertController: AlertController) { }

}
