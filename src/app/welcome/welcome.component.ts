import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') nameInput!: ElementRef;
  constructor(@Inject(PLATFORM_ID) private platformID: any) { }

  ngOnInit(): void { }

  startQuiz() {
    if (isPlatformBrowser(this.platformID)) {
      localStorage.setItem('name', this.nameInput.nativeElement.value);
    }

  }
}
