import {Component, OnInit} from '@angular/core';
import {LeftoverService} from "../shared/_services/leftover.service";
import {Leftover} from "../shared/_models/leftover.model";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  leftovers: Leftover[] = []

  constructor(private leftoverService: LeftoverService) {
  }

  ngOnInit() {
    this.leftoverService.getAllLeftoversProcessed(true)
      .subscribe({next: value => {
        this.leftovers = value.payload;

        }})
  }
}
