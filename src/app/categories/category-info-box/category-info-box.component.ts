import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CategoryModel} from "../../shared/_models/category.model";
import {ConditionInputComponent} from "./condition-input/condition-input.component";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditCategory} from "../../shared/_models/edit-category.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConditionModalComponent} from "./condition-modal/condition-modal.component";
import {CategoryService} from "../../shared/_services/category.service";

@Component({
  selector: 'app-category-info-box',
  templateUrl: './category-info-box.component.html',
  styleUrls: ['./category-info-box.component.scss']
})
export class CategoryInfoBoxComponent implements OnInit {
  @Input() category: EditCategory;
  @Input() isCategoryNew: boolean;
  @Input() categoryId: number;
  @ViewChild('trueButton') trueButton: ElementRef;

  isDesktop: boolean;
  screenLGSize: number = 992;
  form: FormGroup;

  conditionsList: String[] = [];

  constructor(private modalService: NgbModal, private categoryService: CategoryService) {
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }

  ngOnInit() {
    if (!this.isDesktop) {
      console.log(this.category);
      console.log(this.isCategoryNew);
      this.fillForm();
    }
    this.initializeForm();
  }

  ngOnChanges() {
    this.updateIsDesktop();
    this.fillForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'condition': new FormControl(null, Validators.required),
      'extraConditions': new FormArray([])
    });
  }

  fillForm() {
    if (this.category != null) {
      const trueButton = this.trueButton.nativeElement;
      this.conditionsList = [];
      (<FormArray>this.form.get('extraConditions')).clear();
      if (!this.isCategoryNew) {
        this.form.get('name')?.patchValue(this.category.name);
        let condition = '';
        let index = 0;
        let firstCondition = true;
        for (let key of Object.keys(this.category.conditions)) {
          for (let i = 0; i < Object.values(this.category.conditions).at(index).length; i++) {
            condition += Object.values(this.category.conditions).at(index)[i] + "%";
            condition += " " + key;
            if (firstCondition) {
              this.form.get('condition')?.patchValue(condition);
              firstCondition = false;
            } else {
              (<FormArray>this.form.get('extraConditions')).push(new FormControl(condition, Validators.required));
            }
            if (i + 1 < Object.values(this.category.conditions).at(index).length) {
              this.conditionsList.push("And");
            }
            condition = '';
          }
          if (index + 1 < Object.keys(this.category.conditions).length) {
            this.conditionsList.push("Or");
          }
          index++
        }
        if (this.category.enabled) {
          trueButton.classList.remove('disabledTrueButton');
          trueButton.classList.add('trueButton');
          trueButton.innerText = 'True';
        } else {
          trueButton.classList.add('disabledTrueButton');
          trueButton.classList.remove('trueButton');
          trueButton.innerText = 'False';
        }
      } else {
        trueButton.classList.remove('disabledTrueButton');
        trueButton.classList.add('trueButton');
        trueButton.innerText = 'True';
        this.initializeForm();

      }
    }
  }

  save() {
    let trueButton = this.trueButton.nativeElement.innerText == 'True';

    let testObject = this.form.get('condition')?.value;

    let testObject2 = this.form.get('name')?.value;

    let final = {
      testObject,
      testObject2
    };

    console.log(final);




    let category = new EditCategory(this.form.get('name')?.value, this.form.get('condition')?.value, trueButton);
    if (this.isCategoryNew) {

    } else {
      category.id = this.category.id;
      console.log(category);
      console.log(testObject);
    }

  }

  getControls() {
    return (<FormArray>this.form.get('extraConditions')).controls;
  }

  addInput() {
    this.modalService.open(ConditionModalComponent, {size: 'sm', centered: true}).
    componentInstance.addInputEvent.subscribe((receivedEntry: String[]) => {
      console.log(receivedEntry);
      this.conditionsList.push(receivedEntry[0]);
      (<FormArray>this.form.get('extraConditions')).push(new FormControl(receivedEntry[1], Validators.required));
      }
      );
  }

  removeCondition(conditionIndex: number) {
    (<FormArray>this.form.get('extraConditions')).removeAt(conditionIndex);
    this.conditionsList.splice(conditionIndex, 1);
  }

  test() {
    console.log("this works");
    console.log(this.category);
  }

  changeTrueButton() {
    if (this.trueButton.nativeElement.innerText == 'True') {
      this.trueButton.nativeElement.classList.add('disabledTrueButton');
      this.trueButton.nativeElement.classList.remove('trueButton');
      this.trueButton.nativeElement.innerText = 'False';
    } else {
      this.trueButton.nativeElement.classList.remove('disabledTrueButton');
      this.trueButton.nativeElement.classList.add('trueButton');
      this.trueButton.nativeElement.innerText = 'True';
    }
  }
}
