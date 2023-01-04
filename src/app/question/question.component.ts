import { QuestionService } from './../services/question.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.getAllQuestions();
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
      this.currentQuestion++;
    } else {
      this.points -= 10;
      this.currentQuestion++;
      this.wrongAnswer++;
    }
  }
}
