import {Component, OnInit} from '@angular/core';
import {LeftoverService} from "../shared/_services/leftover.service";
import {Leftover} from "../shared/_models/leftover.model";
import {HistorymodalComponent} from "./historymodal/historymodal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  searchText: any;
  leftovers: Leftover[] = [];
  filterList: string = 'all';

  constructor(private leftoverService: LeftoverService, public modalService: NgbModal) {
  }

  ngOnInit() {
    this.leftoverService.getAllLeftoversProcessed(true)
      .subscribe({next: value => {
        this.leftovers = value.payload;

        }})
  }
  getType(type: string) {
    this.filterList = type;
    console.log(type)
    if (type == 'all') {
      this.fillListAllTypes()
    } else {
      this.fillByType(type);
    }
  }

  /**
   * fillListAllTypes() fills the todoList with every leftover in the db.
   */
  fillListAllTypes() {
    this.leftoverService.getAllLeftovers().subscribe({
      next: value => {
        this.leftovers = [];
        for (let todo of value.payload) {
          if (todo.processed == true) {
            this.leftovers.push(todo);
          }
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  /**
   * fillByType() fills the todoList with every leftover from a single type in the db.
   * @param type of waste
   */
  fillByType(type: any) {
    this.leftoverService.getAllByType(type).subscribe({
      next: value => {
        this.leftovers = [];
        for (let todo of value.payload) {
          if (todo.processed == true) {
            this.leftovers.push(todo);
          }
        }
      }
    })
  }
  OpenModal(){
    this.modalService.open(HistorymodalComponent);
  }
}
