import {Component} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totalWaste: number = 3650.70;
  selectedWasteAmount: number;

  A1: number= 300;
  A2: number = 800;
  A3: number = 2500;

  ngOnInit() {
    this.selectedWasteAmount = this.A1;
  }

  selectCategory(category:string) {
    switch (category) {
      case "A1":
        this.selectedWasteAmount = this.A1
        break;
      case "A2":
        this.selectedWasteAmount = this.A2
        break;
      case "A3":
        this.selectedWasteAmount = this.A3
        break;
    }
  }
}
