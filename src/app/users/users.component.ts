import {Component, HostListener, OnInit} from '@angular/core';
import {User} from "../shared/_models/user";
import {UserService} from "../shared/_services/user.service";
import {CreateUserComponent} from "./create-user/create-user.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserModalComponent} from "./user-modal/user-modal.component";

/**
 * @author Dino Yang
 */
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
  show: boolean = true;


  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }


  constructor(private userService: UserService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.fillUserList();
    this.updateIsDesktop();
  }

  /**
   * userDetails() sets selectedIndex and selectedUser with the right values after clicking on a User.
   * @param user selected User.
   * @param index in the list.
   */
  userDetail(user: User, index: number): void {
    this.selectedIndex = index;
    this.selectedUser = user;
    if (!this.isDesktop) {
      this.openMobileUserInfo();
    }
  }

  /**
   * fillUserList() fills the userList with every user in the db.
   */
  fillUserList() {
    this.userService.getAllUsers().subscribe({
      next: value => {
        this.userList = value.payload;
      },
    })
  }

  /**
   * refresh() refreshes the view.
   */
  refresh() {
    this.fillUserList();
    this.show = false;
    setTimeout(() => {
      this.userDetail(this.userList[this.selectedIndex], this.selectedIndex);
      this.show = true;
    }, 100);
  }

  /**
   * openCreateUser() opens the create user modal.
   */
  openCreateUser() {
    const modalRef = this.modalService.open(CreateUserComponent, {size: "lg"});
    modalRef.result.then((data => {
        if (data === 'created') {
          this.refresh();
        }
      })
    ).catch((res) => {
    });
  }

  /**
   * openMobileUserInfo() opens the user info modal on mobiles.
   */
  openMobileUserInfo() {
    const modalRef = this.modalService.open(UserModalComponent, {fullscreen: true});
    modalRef.componentInstance.user = this.selectedUser;
  }
}
