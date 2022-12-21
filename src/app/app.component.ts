import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WasteProcessing-Angular';
  screenLGSize: number = 992;
  isDesktop: boolean;


  constructor(public router: Router) {
  }

  ngOnInit() {
    this.updateIsDesktop();
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }
}
