import { QuestionService } from './../services/question.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  name: string | null = '';
  questionList: any = [];
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 60;
  correctAnswer: number = 0;
  wrongAnswer: number = 0;
  interval$: any;
  progress: string = '0';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService
      .getQuestionJson()
      .subscribe((res) => (this.questionList = res.questions));
  }

  goToNextQuestion() {
    if (this.currentQuestion >= this.questionList.length - 1) {
      this.currentQuestion = this.questionList.length - 1;
    } else {
      this.currentQuestion++;
    }
  }

  goToPreviousQuestion() {
    if (this.currentQuestion <= 0) {
      this.currentQuestion = 1;
    }
    {
      this.currentQuestion--;
    }
  }

  selectAnswer(currentQne: number, option: any) {
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      this.goToNextQuestion();
      this.resetCounter();
      this.getProgressStatus();
    } else {
      this.wrongAnswer++;
      this.goToNextQuestion();
      this.resetCounter();
      this.getProgressStatus();
      this.points -= 10;
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 6000000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.currentQuestion = 0;
    this.points = 0;
    this.counter = 60;
    this.progress = '0';
  }

  getProgressStatus() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }
}
