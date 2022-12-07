import {Component, OnInit} from '@angular/core';
import {CutWaste} from "./_models/cut-waste.model";
import {CutWasteService} from "./_services/cut-waste.service";


@Component({
  selector: 'app-waste-processing',
  templateUrl: './waste-processing.component.html',
  styleUrls: ['./waste-processing.component.scss']
})
export class WasteProcessingComponent implements OnInit {
  selectedTodo: CutWaste;
  selectedType: string;
  todoList: CutWaste[] = [];
  showModal: boolean = false;


  constructor(public cutWasteService: CutWasteService) {

  }


  ngOnInit(): void {
    this.fillListAllTypes();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 250);
  }

  todoDetail(todo: CutWaste): void {
    this.selectedTodo = todo;
    this.selectedType = todo.type;
    this.showModal = true;
  }

  setType(type: string) {
    if (type == 'all') {
      this.fillListAllTypes()
    } else {
      this.fillByType(type);
    }
  }

  setShown(value: boolean) {
    this.showModal = value;
  }

  fillListAllTypes() {
    this.cutWasteService.getAllCutWaste().subscribe({
      next: value => {
        this.todoList = [];
        for (let todo of value) {
          if (!todo.processed) {
            this.todoList.push(todo);
          }
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  fillByType(type: string) {
    this.cutWasteService.getAllByType(type).subscribe({
      next: value => {
        this.todoList = [];
        for (let todo of value) {
          if (!todo.processed) {
            this.todoList.push(todo);
          }
        }
      }
    })
  }
}
