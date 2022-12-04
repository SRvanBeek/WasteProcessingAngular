import {Component, OnInit} from '@angular/core';
import {WasteService} from "./_services/waste.service";
import {CutWaste} from "./_models/cut-waste.model";
import {MatTabsModule} from '@angular/material/tabs';


@Component({
  selector: 'app-waste-processing',
  templateUrl: './waste-processing.component.html',
  styleUrls: ['./waste-processing.component.scss']
})
export class WasteProcessingComponent implements OnInit {
  selectedTodo: CutWaste;
  selectedType: string;
  todoList: CutWaste[] = [new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(2, '2', false, 12, 13, "now"), new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(1, '1', false, 12, 12, "now"), new CutWaste(1, '1', false, 12, 12, "now"),];
  showModal: boolean = false;


  constructor(public wasteService: WasteService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 250);
  }

  todoDetail(todo: CutWaste): void {
    this.selectedTodo = todo;
    this.selectedType = 'catWaste';
    this.showModal = true;
  }

  setShown(value: boolean) {
    this.showModal = value;
  }
}
