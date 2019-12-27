import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './pages/main/main.component';
import { CopyClipboardModule } from './directives/copy-clipboard.module';
import { LoginComponent } from './pages/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogModule,
  MatListModule,
  MatProgressBarModule,
  MatIconModule,
  MatDialog
} from '@angular/material';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import { UploadItemComponent, UploadItemDialogComponent } from './components/upload-item/upload-item.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    UploadDialogComponent,
    UploadListComponent,
    UploadItemComponent,
    UploadItemDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CopyClipboardModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatProgressBarModule,
    HttpClientModule,
    MatIconModule
  ],
  entryComponents: [UploadItemDialogComponent],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
