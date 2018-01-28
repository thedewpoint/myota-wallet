import { Component, OnInit, Injectable } from '@angular/core';
import { AccountService, Wallet } from '../account/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
@Injectable()
export class DashboardComponent implements OnInit {

  wallet: Wallet;
  accountService: AccountService;
  constructor(accountService: AccountService) {
    this.accountService = accountService;
   }

  ngOnInit() {
    this.wallet = this.accountService.getWallet();
  }

}
