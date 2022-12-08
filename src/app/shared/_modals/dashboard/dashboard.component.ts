import {Component} from '@angular/core';
import {DashboardService} from "./service/dashboard.service";
import {WasteService} from "../../../waste-processing/waste.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  totalWasteWeight: number;
  totalWasteMetrage: number;
  selectedWasteWeight: number;
  selectedWasteMetrage: number;

  categories:string[];

  constructor(public dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.setTotalWaste();
    this.getCategoryNames();
  }

  private setTotalWaste() {
    this.dashboardService.getTotalWaste().subscribe({
      next: value => {
        this.totalWasteWeight = value[0];
        this.totalWasteMetrage = value[1];
      }
    });
  }

  private getCategoryNames() {
    this.dashboardService.getCategories().subscribe({
      next: categories => {
          this.categories = categories;
          this.selectCategory(this.categories[0])
      }
    })
  }

  selectCategory(category:string) {
    this.dashboardService.getTotalWastePerCategory(category).subscribe({
      next: value => {
        this.selectedWasteWeight = value[0];
        this.selectedWasteMetrage = value[1];
      }
    });
  }
}
