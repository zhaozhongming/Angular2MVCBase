///<reference path="./../../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app';
import { AboutComponent }          from './about/about';
import { routing } from './route';

@NgModule({
    imports: [BrowserModule,  routing],
    declarations: [AppComponent, AboutComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }