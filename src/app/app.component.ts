import {Component} from '@angular/core';
import {MatIconRegistry, MatDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Iota} from 'iota-basic';
import {INode, NodeService} from './node/node.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import * as blockies from 'ethereum-blockies';
import * as FileSaver from 'file-saver';
import { EncryptionService } from './encryption/encryption.service';
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
  blockie: string;
  walletFile: File;
  encryptionService: EncryptionService;


  constructor(nodeService: NodeService, domSanitizer: DomSanitizer, encryptionService: EncryptionService) {
    this.nodeService = nodeService;
    this.encryptionService = encryptionService;
  }
  ngOnInit(): void {
    this.nodeService.getNodes().subscribe(
      nodes => this.nodes = nodes, //Bind to view
       err => {
           // Log errors if any
           console.log(err);
       });
  }
}