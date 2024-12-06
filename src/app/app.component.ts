import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterLink, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AppResource';

  constructor(@Inject(PLATFORM_ID) private platform: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      console.log("AppComponent:browser");
    }

    if (isPlatformServer(this.platform)) {
      console.log("AppComponent:server");
    }
  }
}
