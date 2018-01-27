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
  async handleFileInput(files: FileList) {
    this.walletFile = await this.encryptionService.decrypt(files.item(0),"test");
    var that = this;
    var reader = new FileReader();
        reader.readAsText(this.walletFile, "UTF-8");
        reader.onload = function (evt) {
            console.log(JSON.parse(evt.target.result));
            const json = JSON.parse(evt.target.result);
            that.update(json.seeds[0]);
        }
        reader.onerror = function (evt) {
            console.log('error reading file');
        }
  }
  async saveFile(){
    const myJson = {seeds:[this.seed]};
    // const encrypted = await this.encryptionService.encrypt("test","test");  
    // console.log("encrypted",encrypted);
    // const decrypted = await this.encryptionService.decrypt(encrypted,"test");
    // console.log("decrypted",decrypted);
    let file = new File([JSON.stringify(myJson)], "wallet.json", {type: "application/json;charset=utf-8"});
    file = await this.encryptionService.encrypt(file,"test");
    FileSaver.saveAs(file);
    //https://blog.engelke.com/2014/07/16/symmetric-cryptography-in-the-browser-conclusion/
  }
}