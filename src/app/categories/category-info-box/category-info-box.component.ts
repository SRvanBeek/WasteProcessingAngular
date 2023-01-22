import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {CategoryModel} from "../../shared/_models/category.model";
import {ConditionInputComponent} from "./condition-input/condition-input.component";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditCategory} from "../../shared/_models/edit-category.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConditionModalComponent} from "./condition-modal/condition-modal.component";

@Component({
  selector: 'app-category-info-box',
  templateUrl: './category-info-box.component.html',
  styleUrls: ['./category-info-box.component.scss']
})
export class CategoryInfoBoxComponent implements OnInit {
  @Input() category: EditCategory;
  @ViewChild('trueButton') trueButton: ElementRef;

  form: FormGroup;

  conditionsList: String[] = [];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'condition': new FormControl(null, Validators.required),
      'extraConditions': new FormArray([])
    });
  }

  ngOnChanges() {
    if (this.category != null) {
      this.form.get('name')?.patchValue(this.category.name);

    }
  }

  save() {
    console.log(this.form);
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
