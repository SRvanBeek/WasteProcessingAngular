import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  screenLGSize: number = 992;
  typeHistory: string;
  typeAdmin: string;


  ngOnInit() {
    if (window.innerWidth >= this.screenLGSize) {
      this.typeHistory = 'history';
      this.typeAdmin = 'admin';
    } else {
      this.typeHistory = 'historyOff';
      this.typeAdmin = 'adminOff';
    }
  }

  @HostListener("window:resize", []) updateHistory() {
    if (window.innerWidth >= this.screenLGSize) {
      this.typeHistory = 'history';
      this.typeAdmin = 'admin';
    } else {
      this.typeHistory = 'historyOff';
      this.typeAdmin = 'adminOff';
    }
  }

  @HostListener("document:click", ['$event.target']) clickNavbar(clickPosition: any) {
    let shownEl = document.getElementsByClassName('show');
    if (shownEl.length != 0) {
      let buttonID = shownEl[0].id + 'Button';
      let subMenu = document.getElementById(shownEl[0].id);
      let button = document.getElementById(buttonID);
      if (button) {
        if (!clickPosition.closest('#navBar') && !clickPosition.closest('#' + subMenu)) {
          button.dispatchEvent(new CustomEvent('click'));
        }
      }
    }
  }
}
