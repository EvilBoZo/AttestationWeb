interface ITask {
  id: number;
  text: string;
  isImportant: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
}

export default class Task implements ITask {
  public id: number;
  public text: string;
  public isImportant: boolean;
  public isCompleted: boolean;
  public isDeleted: boolean;

  constructor(id: number, text: string, isImportant: boolean, isCompleted: boolean, isDeleted: boolean) {
    this.id = id;
    this.text = text;
    this.isImportant = isImportant;
    this.isCompleted = isCompleted;
    this.isDeleted = isDeleted;
  }
}