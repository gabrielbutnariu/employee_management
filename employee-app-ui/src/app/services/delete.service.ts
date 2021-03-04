import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient) { }


  onDelete(uuid: string): void{
    console.log('On delete !!!' + uuid);
  }
}
