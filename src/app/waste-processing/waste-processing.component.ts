import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Leftover} from "../shared/_models/leftover.model";
import {LeftoverService} from "../shared/_services/leftover.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToDoModalComponent} from "../shared/_modals/to-do-modal/to-do-modal.component";
import {ToastService} from "../shared/_services/toast.service";
import {DashboardComponent} from "../shared/_modals/dashboard/dashboard.component";

/**
 * @Author Dino Yang
 */
@Component({
  selector: 'app-waste-processing',
  templateUrl: './waste-processing.component.html',
  styleUrls: ['./waste-processing.component.scss']
})
export class WasteProcessingComponent implements OnInit {
  selectedIndex: number = -1;
  selectedTodo: Leftover;
  selectedType: string;
  todoList: Leftover[] = [];
  screenLGSize: number = 992;
  isDesktop: boolean;
  showInfoBox: boolean = false;
  userID: number;
  filterList: string = 'all';
  show: boolean = true;

  @ViewChild(DashboardComponent) child !: DashboardComponent;
  hdv: boolean = false;

  constructor(private leftoverService: LeftoverService, private modalService: NgbModal, private toastService: ToastService) {
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }


  ngOnInit(): void {
    this.fillListAllTypes();
    this.updateIsDesktop();
    this.setUserID();
    this.setHDV();
  }

  setHDV() {
    const hdvOption = localStorage.getItem('hdv');
    this.hdv = hdvOption === 'enabled';
  }

  /**
   * setUserID() gets the userId from the jwt in localStorage and sets this.userID to it.
   */
  setUserID(): void {
    let jwt = localStorage.getItem('JwtToken');
    if (jwt) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      this.userID = decodedJwtData.userId;
    }
  }

  /**
   * todoDetail() sets selectedIndex, selectedTodo and selectedType with the right values after clicking on a leftover.
   * @param leftover leftover that is selected.
   * @param index in the list.
   */
  todoDetail(leftover: Leftover, index: number): void {
    this.selectedIndex = index;
    this.selectedTodo = leftover;
    this.selectedType = leftover.type;
    if (!this.isDesktop) {
      this.openMobileInfo();
    }
  }

  /**
   * setType() is used for sorting the list based on leftover type.
   * @param type of waste.
   */
  setType(type: string) {
    this.filterList = type;
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
        this.todoList = [];
        for (let todo of value.payload) {
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

  /**
   * fillByType() fills the todoList with every leftover from a single type in the db.
   * @param type of waste
   */
  fillByType(type: any) {
    this.leftoverService.getAllByType(type).subscribe({
      next: value => {
        this.todoList = [];
        if (value.payload) {
          for (let todo of value.payload) {
            if (!todo.processed) {
              this.todoList.push(todo);
            }
          }
        }
      }
    })
  }

  refresh(list: Leftover[]) {
    this.todoList = list;
    this.selectedIndex = 0;
    this.show = false;
    setTimeout(() => {
      this.todoDetail(this.todoList[0], 0);
      this.show = true;
    }, 100);
  }

  private openMobileInfo() {
    const modalRef = this.modalService.open(ToDoModalComponent, {fullscreen: true});
    modalRef.componentInstance.userId = this.userID;
    modalRef.componentInstance.list = this.todoList;
    modalRef.componentInstance.todo = this.selectedTodo;
    modalRef.componentInstance.type = this.selectedType;
    modalRef.result.then((data => {
      if (data) {
        this.refresh(data);
        this.toastService.show('', "You've just processed a Leftover.\n Good Job!");
      }
    }))
  }

  refreshDetails() {
    this.child.refresh()
  }
}
