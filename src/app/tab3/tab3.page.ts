import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  currentUser="test";
  display1: any;
  savedArray: Array<string>;
  userLogin = [
    { "username": "test", "password": "test", "dob": "20/02/2020", "saved": ["apples", "pears"]}
  ];
  test = "0,1";
  array = [this.test];
  test2:any;
  retrieveData: any;
  


  display(){
    for (let i of this.userLogin){
      if(i.username==this.currentUser){
        console.log("Success");
        this.savedArray=i["saved"];
        console.log(i["saved"]);
        return this.savedArray;
        console.log(this.display1);
      }
      }
    console.log(this.userLogin["username"]);
  }

  retrieveItem(){
    this.retrieveData=localStorage.getItem("test");
    this.test2=JSON.parse(this.retrieveData);
    console.log(this.test2);
  }
  

}
