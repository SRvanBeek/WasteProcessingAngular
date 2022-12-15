import {Component} from '@angular/core';
import {DashboardService} from "./service/dashboard.service";

/**
 * @author Stijn van Beek
 */
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

  categories: string[];
  composition: string[];

  constructor(public dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.setTotalWaste();
    this.getCategoryNames();
  }

  refresh() {
    this.setTotalWaste();
    this.getCategoryNames();
    this.selectCategory(this.categories[0]);
  }

  /**
   * gets the total waste weight and metrage from the database.
   * @private
   */
  private setTotalWaste() {
    this.dashboardService.getTotalWaste().subscribe({
      next: value => {
        this.totalWasteWeight = value[0];
        this.totalWasteMetrage = value[1];
      }
    });
  }

  /**
   * gets every category name from the database.
   * @private
   */
  private getCategoryNames() {
    this.dashboardService.getCategories().subscribe({
      next: categories => {
          this.categories = categories;
          this.selectCategory(this.categories[0])
      }
    })
  }

  /**
   * calls dashboardService to set the weight, metrage and composition of the selected category.
   * @param category the selected category in the view.
   */
  selectCategory(category:string) {
    this.dashboardService.getTotalWastePerCategory(category).subscribe({
      next: value => {
        this.selectedWasteWeight = value[0];
        this.selectedWasteMetrage = value[1];
      }
    });
    this.dashboardService.getComposition(category).subscribe({
      next: value => {
        this.composition = value;
      }
    });
  }
}
