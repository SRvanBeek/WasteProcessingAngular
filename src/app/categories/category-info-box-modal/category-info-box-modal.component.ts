import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit, Output,
} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {EditCategory} from "../../shared/_models/edit-category.model";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryService} from "../../shared/_services/category.service";
import {CategoryJSON} from "../../shared/_models/category-json.model";
import {ConvMap} from "../../shared/_models/conv-map";
import {ToastService} from "../../shared/_services/toast.service";
import {first} from "rxjs";
import {ConditionModalComponent} from "../category-info-box/condition-modal/condition-modal.component";

/**
 * @author Noah Elstgeest
 */

@Component({
  selector: 'app-category-info-box-modal',
  templateUrl: './category-info-box-modal.component.html',
  styleUrls: ['./category-info-box-modal.component.scss']
})
export class CategoryInfoBoxModalComponent implements OnInit {
  @Input() category: EditCategory;
  @Input() isCategoryNew: boolean;
  @Input() categoryId: number;
  @Output() refresh = new EventEmitter<void>();

  isDesktop: boolean;
  screenLGSize: number = 992;
  form: FormGroup;
  trueButtonBool: boolean = true;
  conditionsList: string[] = [];

  constructor(public modalService: NgbModal, private categoryService: CategoryService,
              private toastService: ToastService, public ActiveModalService: NgbActiveModal) {
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }

  ngOnInit() {
    this.initializeForm();
    if (!this.isDesktop) {
      this.fillForm();
    }
  }

  ngOnChanges() {
    this.updateIsDesktop();
    this.fillForm();
  }

  /**
   * initializeForm() initializes the reactive form.
   */

  initializeForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'condition': new FormControl(null, [Validators.required, this.createPercentValidator(), this.createBracketValidator()]),
      'extraConditions': new FormArray([])
    });
  }

  /**
   * createPercentValidator() creates a custom validator that checks whether the input has a %.
   */

  createPercentValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasPercentage = /%+/.test(value);

      return !hasPercentage ? {noPercentage:true}: null;
    }
  }

  /**
   * createPercentValidator() creates a custom validator that checks whether the input has a < or a >
   * and checks if the value is not 100.
   */

  createBracketValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasBracket = /[<>]+/.test(value);

      return !hasBracket && !value.includes("100") ? {noBracket:true}: null;
    }
  }

  /**
   * fillForm() fills the form with the category that is given via the input. For each condition that is in the category,
   * a new form control gets created in the extraConditions form array with the value (which is also manipulated) inside.
   */

  fillForm() {
    if (this.category != null) {
      this.conditionsList = [];
      (<FormArray>this.form.get('extraConditions')).clear();
      if (!this.isCategoryNew) {
        this.form.get('name')?.patchValue(this.category.name);
        let condition = '';
        let index = 0;
        let firstCondition = true;
        for (let key of Object.keys(this.category.conditions)) {
          for (let i = 0; i < Object.values(this.category.conditions).at(index).length; i++) {
            if (Object.values(this.category.conditions).at(index)[i] != "Overig") {
              condition += Object.values(this.category.conditions).at(index)[i] + "%";
              condition += " " + key;
              if (firstCondition) {
                this.form.get('condition')?.patchValue(condition);
                firstCondition = false;
              } else {
                (<FormArray>this.form.get('extraConditions')).push(new FormControl(condition, [Validators.required, this.createPercentValidator(), this.createBracketValidator()]));
              }
              if (i + 1 < Object.values(this.category.conditions).at(index).length) {
                this.conditionsList.push("And");
              }
              condition = '';
            }
          }
          if (index + 1 < Object.keys(this.category.conditions).length) {
            this.conditionsList.push("Or");
          }
          index++
        }
        this.trueButtonBool = this.category.enabled;
      } else {
        this.trueButtonBool = true;
        this.form.reset();

      }
    }
  }

  /**
   * mapConditions() takes the conditions of the values inside the condition and extra conditions form controls
   * and puts them inside a map.
   *
   * @return A map with the conditions inside.
   */

  mapConditions() {
    let map = new Map<string, string[]>();

    let conditionValue = (<String>this.form.get('condition')?.value);
    let extraConditionValue = (<FormArray>this.form.get('extraConditions'));

    let key = conditionValue.slice(conditionValue.indexOf("%") + 2);
    let item = conditionValue.slice(0, conditionValue.indexOf("%"));
    let itemArray = [item];

    if (this.conditionsList.length > 0) {
      let firstCondition = true;
      for (let i = 0; i < this.conditionsList.length; i++) {

        if (this.conditionsList.at(i) == "And") {
          if (firstCondition) {
            firstCondition = false;
            i--;
          } else {
            itemArray.push(extraConditionValue.at(i).value.slice(0, extraConditionValue.at(i).value.indexOf("%")));
            map.set(key, itemArray);
          }
        } else if (this.conditionsList.at(i) == "Or") {
          if (firstCondition) {
            firstCondition = false;
            i--;
          } else {
            key = extraConditionValue.at(i).value.slice(extraConditionValue.at(i).value.indexOf("%") + 2);
            itemArray = [];
            itemArray.push(extraConditionValue.at(i).value.slice(0, extraConditionValue.at(i).value.indexOf("%")));
          }
          map.set(key, itemArray);
        }
      }
    } else {
      map.set(key, itemArray);
    }

    return map;
  }

  /**
   * save() puts or posts all the values from the form and the map and gives a toast when it succeeds of fails.
   * It then resets the form, closes the modal and refreshes the categories.
   */

  save() {
    let trueButton = this.trueButtonBool;

    let category = new EditCategory(this.form.get('name')?.value, this.mapConditions(), trueButton);

    let conditions: Map<string, string[]> = category.conditions;
    const convMap: ConvMap = {};
    conditions.forEach((val: string[], key: string) => {
      convMap[key] = val;
    });

    let categoryJson: CategoryJSON = new CategoryJSON();
    categoryJson.conditions = convMap;
    categoryJson.name = category.name;
    categoryJson.enabled = category.enabled;

    let message: string;
    let header: string;


    if (this.isCategoryNew) {
      this.categoryService.postCategory(categoryJson).pipe(first()).subscribe({
        next: response => {
          if (response.code == "ACCEPTED") {
            header = "Category added!";
            this.form.reset();
            this.ActiveModalService.close();
          } else {
            header = "Failed to add category!";
          }
          message = response.message;
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          this.toastService.show(header, message);
        }
      });
    } else {
      categoryJson.id = this.category.id;
      this.categoryService.putCategory(categoryJson).pipe(first()).subscribe({
        next: response => {
          if (response.code == "ACCEPTED") {
            header = "Category updated!";
            this.form.reset();
            this.ActiveModalService.close();
          } else {
            header = "Update failed!";
          }
          message = response.message;
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          this.toastService.show(header, message);
        }
      });
    }

  }

  /**
   * getControls() gives form controls of the extraConditions.
   *
   * @return form controls of the extraConditions.
   */

  getControls() {
    return (<FormArray>this.form.get('extraConditions')).controls;
  }

  /**
   * addInput() opens the condition modal and creates a new input in the extra conditions form array.
   * It then puts the received data of the condition modal inside the extra Conditions input.
   */

  addInput() {
    this.modalService.open(ConditionModalComponent, {size: 'sm', centered: true}).
    componentInstance.addInputEvent.subscribe((receivedEntry: string[]) => {
        this.conditionsList.push(receivedEntry[0]);
        (<FormArray>this.form.get('extraConditions')).push(new FormControl(receivedEntry[1], [Validators.required, this.createPercentValidator(), this.createBracketValidator()]));
      }
    );
  }

  /**
   *  removeCondition() removes an input from the extra conditions.
   *
   * @param conditionIndex Index of the input that needs to be deleted inside the extra conditions form array.
   */

  removeCondition(conditionIndex: number) {
    (<FormArray>this.form.get('extraConditions')).removeAt(conditionIndex);
    this.conditionsList.splice(conditionIndex, 1);
  }

  /**
   * changeTrueButton() changes the true or false button to true or false.
   */

  changeTrueButton() {
    this.trueButtonBool = !this.trueButtonBool;
  }
}
