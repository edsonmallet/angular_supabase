import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbMenuBag,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
} from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  itens: NbMenuItem[];
  user: User;
  private destroyed$: Subject<boolean> = new Subject();

  constructor(
    private menuService: NbMenuService,
    private sidebarService: NbSidebarService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createMenu();

    this.menuService
      .onItemClick()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((menuBar: NbMenuBag) => {
        if (menuBar.item.title === 'Sair') {
          this.logout();
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  createMenu(): void {
    this.itens = [
      {
        title: 'Dashboard',
        icon: 'home-outline',
        link: '/admin/dashboard',
        home: true,
      },
      {
        title: 'Categorias',
        icon: 'home-outline',
        link: '/admin/dashboard',
        home: false,
      },
      {
        title: 'Produtos',
        icon: 'home-outline',
        link: '/admin/dashboard',
        home: false,
      },
      {
        title: 'Movimentações',
        icon: 'home-outline',
        link: '/admin/dashboard',
        home: false,
      },
      {
        title: 'Sair',
        icon: 'home-outline',
        link: '/admin/dashboard',
        home: false,
      },
    ];
  }

  toggleSidebar(): void {
    this.sidebarService.toggle(true, 'menu-main');
  }

  logout(): void {
    this.userService.singOut().then((value) => {
      if (!value.error) {
        localStorage.removeItem('@app-stock:auth');
        this.router.navigate(['/login']);
      }
    });
  }
}
