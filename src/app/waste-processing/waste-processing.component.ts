import {Component, HostListener, OnInit} from '@angular/core';
import {CutWaste} from "./_models/cut-waste.model";
import {CutWasteService} from "./_services/cut-waste.service";


@Component({
  selector: 'app-waste-processing',
  templateUrl: './waste-processing.component.html',
  styleUrls: ['./waste-processing.component.scss']
})
export class WasteProcessingComponent implements OnInit {
  selectedIndex: number = -1;
  selectedTodo: CutWaste;
  selectedType: string;
  todoList: CutWaste[] = [];
  showModal: boolean = false;
  screenLGSize: number = 992;
  isDesktop: boolean;
  showInfoBox: boolean = false;


  constructor(public cutWasteService: CutWasteService) {
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }


  ngOnInit(): void {
    this.fillListAllTypes();
    this.updateIsDesktop();
  }

  ngAfterViewInit() {
  }

  todoDetail(todo: CutWaste, index: number): void {
    this.selectedIndex = index;
    this.selectedTodo = todo;
    this.selectedType = todo.type;
    if (!this.isDesktop) {
      this.showModal = true;
    }
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
