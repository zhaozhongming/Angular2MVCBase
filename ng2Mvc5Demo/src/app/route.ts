import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app';
import { AboutComponent } from './about/about';

// Route Configuration
export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'about', component: AboutComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);