import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface INode {
  node: string;
  port: string;
  tips: number;
  version: string;
  index: number;
  solid: number;
  neighbors: number;
  pow: boolean;
  load: number;
  health: number;
}

@Injectable()
export class NodeService {
  http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
   }
   getNodes(): Observable<INode[]>{
     return this.http.get<INode[]>("http://iota.dance/data/node-stats")
   }

}
