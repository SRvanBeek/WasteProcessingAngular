import {Component, HostListener, ViewChild} from '@angular/core';
import {CategoryService} from "../shared/_services/category.service";
import {CategoryModel} from "../shared/_models/category.model";



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  isDesktop: boolean;
  screenLGSize: number = 992;
  categoriesList: CategoryModel[] = [];
  selectedCategory: CategoryModel;

  constructor(private categoryService: CategoryService) {
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }

  ngOnInit(): void {
    this.updateIsDesktop();
    this.fillCategoryList();
  }

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

  showInfoBox() {
    document.getElementById("infoBox")!.classList.remove("hide");
  }

  showInfoBoxFilled(categoryId: number) {
    this.categoryService.getCategoryNameById(categoryId).subscribe({
      next: value => {
        console.log(value);
        this.selectedCategory = value.payload;
        console.log(this.selectedCategory.conditions);
      },
      error: err => {
        console.log(err);
      }
    })
    document.getElementById("infoBox")!.classList.remove("hide");
  }

}
