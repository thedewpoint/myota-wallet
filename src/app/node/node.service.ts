import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//http://motyar.info/webscrapemaster/api/?url=http://testing-ground.scraping.pro/blocks&xpath=//div[@id=case1]/div[1]/span[1]/div
export  interface INode {
  node_id: string;
  online: string;
  host: string;
  location: string;
  app_name: string;
  app_version: string;
  memory_free: string;
  memory_max: string;
  memory_total: string;
  jre_version: string;
  latest_milestone_index: string;
  latest_sub_milestone_index: string;
  neighbors: string;
  tips: string;
  transactions_to_request: string;
  updated: string;
}

@Injectable()
export class NodeService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
   }
   getNodes(): Observable<INode[]>{
     return this.http.get<INode[]>("https://iotanode.host/node_table.json")
   }

}
