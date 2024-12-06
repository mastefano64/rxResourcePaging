import { Route, Routes } from '@angular/router';

import { HomeComponent } from './component/home/home.component';
// import { Page1Component } from './component/page1/page1.component';
// import { Page2Component } from './component/page2/page2.component';
// import { Page3Component } from './component/page3/page3.component';
// import { Page4Component } from './component/page4/page4.component';
// import { Page5Component } from './component/page5/page5.component';
// import { Page6Component } from './component/page6/page6.component';

// export const routes: Route[] = [
//   { path: 'home', component: HomeComponent },
//   { path: 'page1', component: Page1Component },
//   { path: 'page2', component: Page2Component },
//   { path: 'page3', component: Page3Component },
//   { path: 'page4', component: Page4Component },
// ];

export const routes: Route[] = [
  { path : '' , redirectTo : '/home' , pathMatch : 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'page1', loadComponent: () => import('./component/page1/page1.component')
    .then(mod => mod.Page1Component)
  },
  { path: 'page2', loadComponent: () => import('./component/page2/page2.component')
    .then(mod => mod.Page2Component)
  },
  { path: 'page3', loadComponent: () => import('./component/page3/page3.component')
    .then(mod => mod.Page3Component)
  },
  { path: 'page4', loadComponent: () => import('./component/page4/page4.component')
    .then(mod => mod.Page4Component)
  }
];
