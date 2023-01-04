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
  selectedOption: any;
  questionList: any = [];
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 60;
  correctAnswer: number = 0;
  wrongAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  questionsAttempted: number = 0;

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionService.getQuestionJson().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  goToNextQuestion(currentQne: number) {
    if (currentQne === this.questionList.length) {
      //this.currentQuestion = this.questionList.length - 1;
      this.isQuizCompleted = true;
    } else {
      this.currentQuestion++;
    }
  }

  goToPreviousQuestion() {
    if (this.currentQuestion <= 0) {
      this.currentQuestion = 1;
    } else {
      this.currentQuestion--;
    }
  }

  //checkQneStatus() {
  //  return this.questionsAnswered.some(
  //    (v) => v !== this.questionList[this.currentQuestion].id
  //  );
  //}

  selectOption(option: any) {
    this.selectedOption = option;
    //console.log(option);
  }

  //selectAnswer(currentQne: number, option: any) {
  //  if (currentQne === this.questionList.length) {
  //    this.isQuizCompleted = true;
  //    this.stopCounter();
  //  }

  //  if (option.correct) {
  //    this.points += 10;
  //    this.correctAnswer++;
  //    this.questionsAnswered.push(this.questionList[this.currentQuestion].id);
  //    setTimeout(() => {
  //      this.goToNextQuestion();
  //      this.resetCounter();
  //      this.getProgressStatus();
  //    }, 600);
  //  } else {
  //    this.questionsAnswered.push(this.questionList[this.currentQuestion].id);
  //    setTimeout(() => {
  //      this.wrongAnswer++;
  //      this.goToNextQuestion();
  //      this.resetCounter();
  //      this.getProgressStatus();
  //    }, 600);
  //    this.points -= 10;
  //  }
  //  console.log(this.questionsAnswered);
  //}

  submitAnswer(currentQne: any) {
    if (currentQne === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }

    if (this.selectedOption.correct) {
      this.points += 10;
      this.correctAnswer++;
      this.questionsAttempted++;
      setTimeout(() => {
        this.goToNextQuestion(currentQne);
        this.resetCounter();
        this.getProgressStatus();
      }, 600);
    } else {
      this.questionsAttempted++;
      setTimeout(() => {
        this.wrongAnswer++;
        this.goToNextQuestion(currentQne);
        this.resetCounter();
        this.getProgressStatus();
      }, 600);

      this.points -= 10;
    }
    console.log(this.selectedOption);

    this.selectedOption = '';
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
