import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProjectPage } from '../project/project';
import { CompanyPage } from '../company/company';
import { NavParams } from   'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProjectPage;
  tab3Root = CompanyPage;

  myIndex: number;
 
  constructor(navParams: NavParams) {
    // Set the active tab based on the passed index from menu.ts
    this.myIndex = navParams.data.tabIndex || 0;
  }
  
}
