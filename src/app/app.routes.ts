import { Routes } from '@angular/router';
import { Dashboard } from './home/dashboard/dashboard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        loadComponent:()=> import('./login/login').then(m=>m.Login)
    },
    {
        path:'dashboard',
        component:Dashboard,
        children:[
           { path: '',  loadComponent:()=> import('./home/dashboard/dashboard-overview/dashboard-overview').then(m=>m.DashboardOverview)},
           { path: 'user', loadComponent:()=>import('./home/dashboard/user-create/user-create').then(m=>m.UserCreate) }
        ]
    }
    
];
