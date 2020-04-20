import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {DataService} from '../data.service';
import {dmWord} from '../word-chain';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  data: any;
  rhymesToShow:string[] = new Array();
  queryword=""

  
  constructor(private route: ActivatedRoute, private router: Router, private dataService:DataService) {
    this.route.queryParams.subscribe(params=> {
      console.log('params: ', params);
      if(params && params.special){
        this.data = params.special;
      }

    });
   }
   getDmSynonyms(){
     this.dataService.dmAPIGetSynonyms(this.queryword).subscribe((data:dmWord[]) =>{
       this.rhymesToShow = data.map(y=>y.word);
       console.log(this.rhymesToShow); });
   };

  ngOnInit() {
  }

}


