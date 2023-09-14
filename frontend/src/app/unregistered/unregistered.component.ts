import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unregistered',
  templateUrl: './unregistered.component.html',
  styleUrls: ['./unregistered.component.css']
})
export class UnregisteredComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public slides = [
    {
      path: "assets/images/02-Clinic-B_resize.jpg"
    },
    {
      path: "assets/images/deenclinic4.jpg"
    },
    {
      path: "assets/images/348s.jpg"
    }
  ];

}
