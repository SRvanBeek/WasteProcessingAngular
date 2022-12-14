import {Component, HostListener, OnInit} from '@angular/core';
import {CutWaste} from "../shared/_models/cut-waste.model";
import {CutWasteService} from "../shared/_services/cut-waste.service";
import {Toast} from "bootstrap";

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
  selectedTodo: CutWaste;
  selectedType: string;
  todoList: CutWaste[] = [];
  showModal: boolean = false;
  screenLGSize: number = 992;
  isDesktop: boolean;
  showInfoBox: boolean = false;
  userID: number;
  filterList: string = 'all';


  constructor(private cutWasteService: CutWasteService) {
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }


  ngOnInit(): void {
    this.fillListAllTypes();
    this.updateIsDesktop();
    this.setUserID();
  }

  ngAfterViewInit() {
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
   * todoDetail() sets selectedIndex, selectedTodo and selectedType with the right values after clicking on a cutWaste.
   * @param cutWaste cutWaste that is selected.
   * @param index in the list.
   */
  todoDetail(cutWaste: CutWaste, index: number): void {
    this.selectedIndex = index;
    this.selectedTodo = cutWaste;
    this.selectedType = cutWaste.type;
    if (!this.isDesktop) {
      this.showModal = true;
    }
    setTimeout(() => {
      this.openToast();
    }, 100);
  }

  /**
   * setType() is used for sorting the list based on cutWaste type.
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

  setShown(value: boolean) {
    this.showModal = value;
  }

  /**
   * fillListAllTypes() fills the todoList with every CutWaste in the db.
   */
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

  /**
   * fillByType() fills the todoList with every CutWaste from a single type in the db.
   * @param type of waste
   */
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

  refresh(list: CutWaste[]) {
    this.todoList = list;
    this.selectedIndex = -1;
  }

  /**
   * openToast() makes it so that when one clicks on the done button a Toast pops up on screen.
   */
  openToast() {
    let toastTrigger;
    if (this.isDesktop) {
      toastTrigger = document.getElementById('done');
    } else {
      toastTrigger = document.getElementById('modalDone');
    }
    const toastLiveExample = document.getElementById('doneToast')
    if (toastTrigger) {
      toastTrigger.addEventListener('click', () => {
        if (toastLiveExample != null) {
          const toast = new Toast(toastLiveExample);
          toast.show()
        }
      })
    }
  }
}
