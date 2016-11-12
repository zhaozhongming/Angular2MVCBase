import { Component } from '@angular/core';
@Component({
    selector: 'my-about',
    //moduleId: module.id, //only need this if we don't use gulp-inline-ng2-template to convert external html file into inline
    templateUrl: 'app/about/about.html' //the path need to change if we don't use gulp-inline-ng2-template
})
export class AboutComponent {
    title = 'ASP.NET MVC 5 with Angular 2 ';
    skills = ['MVC 5', 'Angular 2', 'TypeScript', 'Visual Studio 2015'];
    myskills = this.skills[1];
}