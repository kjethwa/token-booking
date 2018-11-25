import { Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { MapsComponent }   from './maps/maps.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { ClientsessionComponent } from "app/user-screen/clientsession/clientsession.component";
import { AddClientComponent } from "app/client-details/add-client/add-client.component";
import { SearchClientComponent } from "app/client-details/search-client/search-client.component";
import { TokenInfoComponent } from "app/user-screen/clientsession/partials/token-info/token-info.component";

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: ClientsessionComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'maps',
        component: MapsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    },
    {
        path: 'add',
        component: AddClientComponent
    },
    {
        path: 'search',
        component: SearchClientComponent
    },
    {
        path: 'user1',
        component: UserComponent

    },
    {
        path: 'edit/:id',
        component: AddClientComponent

    },
    {
        path: 'book',
        component: TokenInfoComponent
    }
]
