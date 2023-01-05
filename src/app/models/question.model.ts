import { OptionModel } from './option.model';
export interface QuestionsModel {
  questions: QuestionModel[];
}

export interface QuestionModel {
  id: string;
  questionText: string;
  options: OptionModel[];
  explanation: string;
}
