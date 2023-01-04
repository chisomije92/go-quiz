import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') nameInput!: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  startQuiz() {
    localStorage.setItem('name', this.nameInput.nativeElement.value);
  }
}
