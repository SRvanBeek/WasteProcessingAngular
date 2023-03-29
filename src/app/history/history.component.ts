import {Component, OnInit} from '@angular/core';
import {LeftoverService} from "../shared/_services/leftover.service";
import {Leftover} from "../shared/_models/leftover.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../shared/_models/user";
import {UserService} from "../shared/_services/user.service";
import {CustomerService} from "../shared/_services/customer.service";
import {Customer} from "../shared/_models/customer.model";
import {DashboardComponent} from "../shared/_modals/dashboard/dashboard.component";



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  searchText: any;
  searchList: string[] = [];
  shownLeftovers: Leftover[] = [];
  leftovers: Leftover[] = [];
  disabledLeftovers: Leftover[] = [];
  disableChecklist: Leftover[] = [];
  userList: User[] = [];
  filterList: string = 'all';
  customerList: Customer[] = [];
  enabledDropdown: boolean = true;
  disableButton: boolean = false;


  constructor(private leftoverService: LeftoverService, public modalService: NgbModal, private userService: UserService, private customerService: CustomerService) {

  }

  /**
   * this function gets all the leftovers from the database
   */
  ngOnInit() {
    this.leftoverService.getAllLeftoversProcessed(true)
      .subscribe({
        next: value => {
          this.leftovers = [];
          for (let leftover of value.payload) {
            if (leftover.disable == false) {
              this.leftovers.push(leftover);
              this.shownLeftovers.push(leftover);
            } else {
              this.disabledLeftovers.push(leftover);
            }
          }
        }
      })
    this.fillCustomerList()
  }

  /**
   * this function gets all the customers
   */
  fillCustomerList() {
    this.customerService.getAllCustomer().subscribe({
      next: value => {
        this.customerList = value.payload;
      }
    })
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
        this.disabledLeftovers = [];

        for (let todo of value.payload) {
          if (todo.processed == true && todo.disable == false) {
            this.leftovers.push(todo);
          } else if (todo.processed == true && todo.disable == true) {
            this.disabledLeftovers.push(todo);
          }
        }

        if (this.enabledDropdown) {
          this.shownLeftovers = this.leftovers;
        } else {
          this.shownLeftovers = this.disabledLeftovers;
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
          if (todo.processed == true && todo.disable == false) {
            this.leftovers.push(todo);
          }
        }
      }
    })
  }

  /**
   * this function checks what is selected in the dropdown menu
   * and than calls the fillCustomerList function if all is chosen
   * or the fillByCustomer if something else is chosen
   * @param type is the selected tab in the dropdownmenu
   */
  getCustomer(type: string) {
    this.filterList = type;
    if (type == 'all') {
      this.fillListAllTypes();
    } else {
      this.fillByCustomer(type);
    }
  }


  /**
   * this function checks the dropdown menu and checks what is selected. If enabled, all the enabled leftovers will show.
   * If disabled, all the disabled leftovers will show.
   * @param enabled is the selected tab in the dropdownmenu
   */
  getEnabledDisabled(enabled: string){
    this.shownLeftovers = [];
    if (enabled === 'Enabled') {
      this.shownLeftovers = this.leftovers;
      this.enabledDropdown = true;
    } else {
      this.shownLeftovers = this.disabledLeftovers;
      this.enabledDropdown = false;
    }
  }

  /**
   * this function looks at what the type is and then gets the leftovers
   * that belong to that type.
   * @param type
   */
  fillByCustomer(type: any) {
    this.leftoverService.getLeftoverByCustomerId(type).subscribe({
      next: value => {
        this.leftovers = [];
        for (let todo of value.payload) {
          if (todo.processed == true && todo.disable == false) {
            this.leftovers.push(todo);
          }
        }
      }
    })

  }

  /**
   * refreshes the view if something got deleted
   */
  refresh() {
    setTimeout(() => {
      this.fillListAllTypes()
    }, 100);
  }


  openDetails() {
    this.modalService.open(DashboardComponent, {windowClass: 'modalWidth'});
  }

  /**
   * Disables items in disableChecklist and refreshes page
   */
  disable() {
    for (let i = 0; i < this.disableChecklist.length; i++) {
      this.leftoverService.putDisableLeftover(this.disableChecklist[i]).subscribe();
    }
    this.refresh();
  }

  /**
   * Puts incoming leftovers from the child component into or out of the disableChecklist.
   * @param leftover The leftover that's either added or removed from the disableChecklist
   */
  checklistItems(leftover: Leftover) {
    let isSpliced = false;
    for (let i = 0; i < this.disableChecklist.length; i++) {
      if (this.disableChecklist[i] === leftover) {
        this.disableChecklist.splice(i, 1);
        isSpliced = true;
        break;
      }
    }
    if (!isSpliced) {
      this.disableChecklist.push(leftover);
    }
  }

}


