import {Component, HostListener, OnInit} from '@angular/core';
import {User} from "../shared/_models/user";
import {UserService} from "../shared/_services/user.service";
import {CreateUserComponent} from "./create-user/create-user.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserModalComponent} from "./user-modal/user-modal.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  selectedIndex: number = -1;
  isDesktop: boolean;
  screenLGSize: number = 992;
  userList: User[];
  selectedUser: User;
  searchText: any;


  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }


  constructor(private userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.fillUserList();
    this.updateIsDesktop();
  }

  userDetail(user: User, index: number): void {
    this.selectedIndex = index;
    this.selectedUser = user;
    if (!this.isDesktop) {
      this.openMobileUserInfo();
    }
  }

  fillUserList() {
    this.userService.getAllUsers().subscribe({
      next: value => {
        this.userList = value.payload;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  openCreateUser() {
    this.modalService.open(CreateUserComponent, {size: "lg"});
  }

  openMobileUserInfo() {
    const modalRef = this.modalService.open(UserModalComponent, {fullscreen: true});
    modalRef.componentInstance.user = this.selectedUser;
  }
}
