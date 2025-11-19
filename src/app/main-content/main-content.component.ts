import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboveTheFoldComponent } from './above-the-fold/above-the-fold.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsetComponent } from './skillset/skillset.component';
import { FeaturedProjectsComponent } from './featured-projects/featured-projects.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactformComponent } from './contactform/contactform.component';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    AboveTheFoldComponent,
    AboutMeComponent,
    SkillsetComponent,
    FeaturedProjectsComponent,
    TestimonialsComponent,
    ContactformComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

}

