import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { RestapiProvider } from '../providers/restapi/restapi';
import { HttpClientModule } from '@angular/common/http';
import { CompanyPage } from '../pages/company/company';
import { ProjectPage } from '../pages/project/project';
import { ProjectDetailsPage } from '../pages/project-details/project-details';
import { Network } from '@ionic-native/network';
import { CompanyDetailsPage } from '../pages/company-details/company-details';
import { ProfilePage } from '../pages/profile/profile';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ConsProvider } from '../providers/cons/cons';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    CompanyPage,
    CompanyDetailsPage,
    ProjectPage,
    ProjectDetailsPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    TabsPage,
    CompanyPage,
    CompanyDetailsPage,
    ProjectPage,
    ProjectDetailsPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    RestapiProvider,
    Network,
    GoogleMaps,
    LaunchNavigator,
    ConsProvider,
    AppVersion
  ]
})
export class AppModule {}
