import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuidService {

  constructor(private http: HttpClient) { }

  public generateUniqueId(): Promise<any> {
    return new Promise((resolve) => {
      this.http.get('https://helloacm.com/api/guid-generator/?n=1&nohyphens&uppercase').subscribe((result: any) => {
        resolve(result.guid[0]);
      });
    });
  }

}
