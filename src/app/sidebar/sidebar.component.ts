import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'add', title: 'MDM - Add Client',  icon: 'ti-plus', class: '' },
    { path: 'search', title: 'MDM - Search Client',  icon:'ti-search', class: '' },
    { path: 'user', title: 'Book Token',  icon:'ti-user', class: '' },
    { path: 'bookings/view', title: 'Manage Bookings',  icon:'ti-settings', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
