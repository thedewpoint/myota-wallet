import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';


import { FlexLayoutModule } from '@angular/flex-layout';
import { NodeService } from './node/node.service';
import { EncryptionService } from './encryption/encryption.service';
import { LogonComponent } from './logon/logon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountService } from './account/account.service';

const appRoutes: Routes = [
  { path: '', component: LogonComponent },
  {path:'dashboard', component: DashboardComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LogonComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  FlexLayoutModule,
  FormsModule,
  MatChipsModule
  ],
  providers: [NodeService,EncryptionService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
