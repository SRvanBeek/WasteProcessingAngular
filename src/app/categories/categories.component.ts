import {Component, HostListener} from '@angular/core';
import {CategoryService} from "../shared/_services/category.service";
import {CategoryModel} from "../shared/_models/category.model";
import {EditCategory} from "../shared/_models/edit-category.model";
import {CategoryInfoBoxComponent} from "./category-info-box/category-info-box.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryInfoBoxModalComponent} from "./category-info-box-modal/category-info-box-modal.component";


/**
 * @Author Noah Elstgeest
 */

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  isDesktop: boolean;
  isCategoryNew: boolean = true;
  screenLGSize: number = 992;
  categoriesList: CategoryModel[] = [];
  selectedCategory: EditCategory;
  infoBox: CategoryInfoBoxComponent;
  searchText: any;
  hideInfoBox: boolean = true;

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }

  ngOnInit(): void {
    this.updateIsDesktop();
    this.fillCategoryList();
  }

  /**
   * fillCategoryList() gets all the categories from the database and puts them into categorieslist.
   */

  fillCategoryList() {
    this.categoryService.getAllCategories().subscribe({
      next: value => {
        this.categoriesList = [];
        for (let category of value.payload) {
          this.categoriesList.push(category);
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  /**
   * showInfoBox() shows the infobox component with an empty form. If it's not opened on desktop it will open a modal instead.
   */

  showInfoBox() {
    this.isCategoryNew = true;
    if (!this.isDesktop) {
      const modal = this.modalService.open(CategoryInfoBoxModalComponent, {size: "lg"});
      modal.componentInstance.isCategoryNew = this.isCategoryNew;
      modal.result.finally((() => {
        this.refresh();
      }));
    } else {
      this.hideInfoBox = false;
    }
  }

  /**
   * refresh() refreshes the categoriesList.
   */

  refresh() {
    setTimeout(() => {
      this.fillCategoryList();
      this.hideInfoBox = true;
    }, 100);
  }

  /**
   * showInfoBoxFilled() shows the infobox component with a form filled with the given category data.
   * If it's not opened on desktop, it calls initModal instead.
   *
   * @param categoryId category to fill the form with.
   */

  showInfoBoxFilled(categoryId: number) {
    this.isCategoryNew = false;
    this.categoryService.getCategoryNameById(categoryId).subscribe({
      next: value => {
        this.selectedCategory = value.payload;
        this.initModal(categoryId);
      },
      error: err => {
        console.log(err);
      }
    })

  }

  /**
   * initializes the modal and gives the category to the infoboxmodal component.
   *
   * @param categoryId category to fill the form with.
   */

  initModal(categoryId: number) {
    if (!this.isDesktop) {
      const modal = this.modalService.open(CategoryInfoBoxModalComponent, {size: "lg"});
      modal.componentInstance.category = this.selectedCategory;
      modal.componentInstance.isCategoryNew = this.isCategoryNew;
      modal.result.finally(() => {
        this.refresh();
      });
    } else {
      this.categoryService.getCategoryNameById(categoryId).subscribe({
        next: value => {
          this.selectedCategory = value.payload;
        },
        error: err => {
          console.log(err);
        }
      })
      this.hideInfoBox = false;
    }
  }

}
