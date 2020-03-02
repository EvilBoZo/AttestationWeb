import Task from './types/task';

/**
 * Получить все задачи.
 */
export async function getTasks(): Promise<Array<Task>> {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET'
  };
  const response = await fetch('api/task/alltasks', options);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(`Error: ${response.statusText}`);
}

/**
 * Получить важные задачи.
 */
export async function getImportanceTasks(): Promise<Array<Task>> {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET'
  };
  const response = await fetch('api/sort/importance', options);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(`Error: ${response.statusText}`);
}

/**
 * Получить выполненные задачи.
 */
export async function getCompletedTasks(): Promise<Array<Task>> {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET'
  };
  const response = await fetch('api/sort/completed', options);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(`Error: ${response.statusText}`);
}

/**
 * Получить задачу по id.
 */
export async function getTaskById(id: number): Promise<Task> {
  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET'
  };
  const response = await fetch('api/task/task/' + id, options);
  if (response.status === 200) {
    return await response.json();
  }
  throw new Error(`Error: ${response.statusText}`);
}

/**
 * Добавить новую задачу.
 */
export async function addTask(currentText: string, currentIsImportant: boolean): Promise<void> {
  const tasks: Array<Task> = await getTasks();
  const count = tasks[tasks.length - 1].id;

  const task: Task = { id: count + 1, text: currentText, isImportant: currentIsImportant, isCompleted: false, isDeleted: false };

  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(task)
  };
  const response = await fetch('api/task/add', options);
  if (response.status === 204) {
    return alert(`Задача ${task.id} добавлена`);
  }
  throw new Error(`Error: ${response.statusText}`);
}

/**
 * Редактировать задачу.
 */
export async function editTask(task: Task): Promise<void> {

  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(task)
  };
  const response = await fetch('api/task/edit', options);
  if (response.status === 204) {
    return alert(`Задача ${task.id} изменена`);
  }
  throw new Error(`Error: ${response.statusText}`);
}

/**
 * Удалить список задач по id.
 */
export async function deleteTask(id: number): Promise<void> {

  const options = {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(id)
  };

  const response = await fetch('api/task/delete', options);
  if (response.status === 204) {
    return alert(`Задача ${id} удалена`);
  }
  throw new Error(`Error: ${response.statusText}`);
}
