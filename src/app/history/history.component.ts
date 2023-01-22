import {Component, OnInit} from '@angular/core';
import {LeftoverService} from "../shared/_services/leftover.service";
import {Leftover} from "../shared/_models/leftover.model";
import {HistorymodalComponent} from "./historymodal/historymodal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../shared/_models/user";
import {UserService} from "../shared/_services/user.service";
import {CustomerService} from "../shared/_services/customer.service";
import {Customer} from "../shared/_models/customer.model";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  searchText: any;
  searchList: string[] = [];
  leftovers: Leftover[] = [];
  userList: User[] = [];
  filterList: string = 'all';
  customerList: Customer[]= [];


  constructor(private leftoverService: LeftoverService, public modalService: NgbModal, private userService: UserService, private customerService: CustomerService) {

  }

  /**
   * this function gets all the leftovers from the database
   */
  ngOnInit() {
    this.leftoverService.getAllLeftoversProcessed(true)
      .subscribe({next: value => {
        this.leftovers = value.payload;
        }})
    this.fillEmployeeList()
    this.fillCustomerList()
  }

  fillEmployeeList(){
    this.userService.getAllUsers().subscribe({next: value => {
      this.userList = value.payload;
      }})
  }

  fillCustomerList(){
    this.customerService.getAllCustomer().subscribe({next: value => {
      this.customerList = value.payload;
    }})
  }

  /**
   * this function checks what is selected in the dropdown menu
   * and than calls the fillListAllTypes function if all is chosen
   * or the fillByType if something else is chosen
   * @param type is the selected tab in the dropdownmenu
   */
  getType(type: string) {
    this.filterList = type;
    if (type == 'all') {
      this.fillListAllTypes()
    } else {
      this.fillByType(type);
    }
  }

  /**
   * fillListAllTypes() fills the leftovers[] with every leftover in the db.
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
   * fillByType() fills the leftoverList with every leftover from a single type in the db.
   * @param type of Leftover
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

}
