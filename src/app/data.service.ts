import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  stem= "https://api.datamuse.com/words?ml=";
  constructor(private _http:HttpClient) { }

  public dmAPIGetSynonyms(query:string){
    let querystring:string=this.stem + query;
    return this._http.get(querystring);
    

  }
}
