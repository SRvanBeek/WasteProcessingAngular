import {Component, HostListener, ViewChild} from '@angular/core';
import {CategoryService} from "../shared/_services/category.service";
import {CategoryModel} from "../shared/_models/category.model";
import {EditCategory} from "../shared/_models/edit-category.model";
import {CategoryInfoBoxComponent} from "./category-info-box/category-info-box.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";




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

  constructor(private categoryService: CategoryService, private modalService: NgbModal) {
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
    this.isCategoryNew = true;
    if (!this.isDesktop) {
      this.modalService.open(CategoryInfoBoxComponent).componentInstance.isCategoryNew = this.isCategoryNew;
    } else {
      document.getElementById("infoBox")!.classList.remove("hide");
    }
  }


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

  initModal(categoryId: number) {
    if (!this.isDesktop) {
      const modal = this.modalService.open(CategoryInfoBoxComponent);
      modal.componentInstance.category = this.selectedCategory;
      modal.componentInstance.isCategoryNew = this.isCategoryNew;
    } else {
      this.categoryService.getCategoryNameById(categoryId).subscribe({
        next: value => {
          this.selectedCategory = value.payload;
        },
        error: err => {
          console.log(err);
        }
      })
      document.getElementById("infoBox")!.classList.remove("hide");
    }
  }

}
