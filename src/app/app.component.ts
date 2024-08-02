import { Component, OnInit } from '@angular/core';
import { Jobs } from './mock-job-list';
import { Job } from './job';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  jobList: Job[] = Jobs;
  
  ngOnInit(): void {

  }

}
