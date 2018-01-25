import {Component} from '@angular/core';
import {MatIconRegistry, MatDialog} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Iota} from 'iota-basic';
import {INode, NodeService} from './services/node.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import * as blockies from 'ethereum-blockies';

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

  constructor(nodeService: NodeService, domSanitizer: DomSanitizer) {
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
    this.seed = seed;
    this.checksum = iota.getChecksum();
    const canvas = blockies.create({ // All options are optional 
      seed: seed, // seed used to generate icon data, default: random 
      color: '#03a9f4', // to manually specify the icon color, default: random 
      bgcolor: '#303030', // choose a different background color, default: random 
      size: 15, // width/height of the icon in blocks, default: 8 
      scale: 3, // width/height of each block in pixels, default: 4 
      spotcolor: '#FFFFFF' // each pixel has a 13% chance of being of a third color,  
      // default: random. Set to -1 to disable it. These "spots" create structures 
      // that look like eyes, mouths and noses.  
  });
  this.blockie = canvas.toDataURL();
  }

  generateSeed() {
    const iota = new Iota('');
   iota.generateSeed().then((seed)=>{
    this.update(seed);
   });
  }
}