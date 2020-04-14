import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  inputtedUsername: string;
  inputtedPassword: string;
  num = 0;
  determine: string;
  backdropDismiss: any;
  username: string;
  dob: string;
  testArray=[
    { "username": "test", "password": "test", "dob": "20/02/2020"},
    { "username": "test", "password": "test", "dob": "20/02/2020"}
  ];
  test2: any;
  retrieveData: any;
  display: any;
  currentUser="test";
  savedList: any=[];
  add: any;




  
  constructor(public alertController: AlertController) { }
  medicines = [
    { "name": "blue inhaler", "desc": "Use it throughout the day", "toggleswitch": "No" },
    { "name": "brown inhaler", "desc": "Use it at the beginning and end of everyday", "toggleswitch": "No" }
  ];
  userLogin = [
    { "username": "test", "password": "test", "dob": "20/02/2020","Medication": this.medicines,"trackedMedicine":[]}
  ];
  //Imports keywords using async
  async alertPresent() {
    const alert = await this.alertController.create({
      header: "Alert",
      subHeader: "Incorrect Username/Password",
      message: "Please make sure that you enter a valid username and password combination",
      buttons: ['Dismiss']
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);

  }
  //Add elements to a saved Array to display them on the screen
  displayMed(){
    console.log("hello")
    this.savedList=[];
    console.log("Saved List: ", this.savedList)
    for (let med1 of this.userLogin) {
      console.log("This is the username: ", med1.username);
      if (med1["username"] == this.currentUser){
        for(let element of med1["Medication"]){
          console.log(element);
          this.savedList.push(element);

        }

        //this.add=med1["Medication"];
        //this.add=JSON.stringify(this.add)
        //this.savedList.push(this.add);
        //console.log("Saved list v2: ", this.savedList)
        //this.add=JSON.parse(this.add);
        //
        //console.log("This is add: ", this.add);
        
        //console.log(this.savedList);
      }
  }
  console.log(this.savedList);
  //console.log("This is a test to see if it works: ")
  //for (let test123 of this.savedList){
   // console.log(test123["name"]);

  }
  //Checks if user login details are valid
  async onLogin() {
    for (let i of this.userLogin) {
      
      if (i.username == this.inputtedUsername) {
        if (i.password == this.inputtedPassword) {
          console.log("Gained entry")
          this.username=i.username;
          this.dob=i.dob;
          //Stores currentuser on local storage to allow ease of access for which user is operating the application
          localStorage.setItem("currentUser", this.username);
          this.displayProfile()
        }
        else {
          this.alertPresent();
        }
      }

      else {
        this.alertPresent();
      }
    }
  }
  //Allows Login Screen to be hidden and Profile Screen to be shown
  displayProfile(){
    document.getElementById('loginscreen').hidden = true;
    document.getElementById('profile').hidden = false;
        
  }
  async presentSignUp() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Sign Up',
      inputs: [
        {
          name: 'uName',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'pWord',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder2'
        },
        {
          name: 'name3',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        }
      ],
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
    console.log("This is the role: " + result.data.values.uName);
    console.log("This is the first userLogins ", this.userLogin);
    if (this.determine == "Ok") {
      let prof: any = new Object();
      prof["username"] = result.data.values.uName;
      prof["password"] = result.data.values.pWord;
      this.userLogin.push(prof);
      console.log("This is the updated userLogins ", this.userLogin);
    }



  }
  onRegister() {

  }

  saveItem(){
    console.log(this.testArray);
    localStorage.setItem("test", JSON.stringify(this.testArray));

  }
  retrieveItem(){
    this.retrieveData=localStorage.getItem("test");
    this.test2=JSON.parse(this.retrieveData);
    console.log(this.test2);
  }
  disappear(){
    document.getElementById('loginscreen').hidden = true;
  };
  

}
