import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProjectPage } from '../project/project';
import { CompanyPage } from '../company/company';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProjectPage;
  tab3Root = CompanyPage;

  constructor() { 
  }  

  
}
