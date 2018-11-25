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
    { path: 'view', title: 'View Token',  icon:'ti-view-list-alt', class: '' },
    { path: 'cancel', title: 'Cancel Token',  icon:'ti-text', class: '' },
    { path: 'submit', title: 'Submit Token',  icon:'ti-pencil-alt2', class: '' },
    // { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' }
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },
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
