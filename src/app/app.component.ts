import {Component} from '@angular/core';
import {MatIconRegistry, MatDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Iota} from 'iota-basic';
import {INode, NodeService} from './services/node.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

// import {DialogComponent} from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  seed: string;
  checksum:string;
  nodeService:NodeService;
  nodes: INode[];

  constructor(nodeService: NodeService) {
    this.nodeService = nodeService;
  }
  ngOnInit(): void {
    this.nodeService.getNodes().subscribe(
      nodes => this.nodes = nodes, //Bind to view
       err => {
           // Log errors if any
           console.log(err);
       });
  }
  update(seed){
    const iota = new Iota(seed);
    this.checksum = iota.getChecksum();
  }

}