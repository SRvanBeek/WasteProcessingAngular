import {Component} from '@angular/core';
import {DashboardService} from "./service/dashboard.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

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
  selectedCategory: string;

  categories: string[];
  composition: string[];

  constructor(public dashboardService: DashboardService, public modal: NgbActiveModal) {
  }

  ngOnInit() {
    this.setTotalWaste();
    this.getCategoryNames();
  }

  public refresh() {
    this.setTotalWaste();
    this.selectCategory(this.selectedCategory);
  }

  /**
   * gets the total waste weight and metrage from the database.
   * @private
   */
  private setTotalWaste() {
    this.dashboardService.getTotalWaste().subscribe({
      next: value => {
        let array: number[] = value.payload;
        this.totalWasteWeight = array[0];
        this.totalWasteMetrage = array[1];
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
          this.categories = categories.payload;
          this.selectCategory(this.categories[0])
      }
    })
  }

  /**
   * calls dashboardService to set the weight, metrage and composition of the selected category.
   * @param category the selected category in the view.
   */
  selectCategory(category:string) {
    if (this.selectedCategory != category) {
      this.selectedCategory = category;
    }
    this.dashboardService.getTotalWastePerCategory(this.selectedCategory).subscribe({
      next: value => {
        let array: number[] = value.payload;
        this.selectedWasteWeight = array[0];
        this.selectedWasteMetrage = array[1];
      }
    });
    this.dashboardService.getComposition(this.selectedCategory).subscribe({
      next: value => {
        this.composition = value.payload;
      }
    });
  }

  ConvertNumber(string: string) {
    return Number(string);
  }
}
