using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace WebServer.Models
{
  /// <summary>
  /// Класс для манипуляций со списком задач.
  /// </summary>
  public class TasksEditor
  {
    #region Свойства

    /// <summary>
    /// Список задач.
    /// </summary>
    protected static List<Task> tasks = new List<Task>();

    /// <summary>
    /// Путь к сериализованному списку задач.
    /// </summary>
    private static string path = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location) + @"\tasks.json";

    #endregion

    #region Методы

    /// <summary>
    /// Сериализовать список задач.
    /// </summary>
    private static void Serialize()
    {
      if (tasks.Count == 0)
      {
        tasks.Add(new Task() { Id = 0, Text = "Default Task", IsCompleted = false, IsImportant = false, IsDeleted = false });
      }
      using (StreamWriter sw = new StreamWriter(path, false, System.Text.Encoding.Default))
      {
        sw.WriteLine(JsonSerializer.Serialize<List<Task>>(tasks, new JsonSerializerOptions() { WriteIndented = true }));
      }
    }

    /// <summary>
    /// Десеариализовать список задач.
    /// </summary>
    private static void Deserialize()
    {
      if (File.Exists(path))
      {
        using (StreamReader sr = new StreamReader(path))
        {
          tasks = JsonSerializer.Deserialize<List<Task>>(sr.ReadToEnd());
        }
      }
      else
      {
        Serialize();
      }
    }

    /// <summary>
    /// Добавить новую задачу.
    /// </summary>
    /// <param name="task"></param>
    public static void Add(Task task)
    {
      tasks.Add(task);
      Serialize();
    }

    /// <summary>
    /// Редактировать задачу.
    /// </summary>
    /// <param name="task"></param>
    public static void Edit(Task task)
    {
      foreach (Task currentTask in tasks)
      {
        if (task.Id == currentTask.Id)
        {
          currentTask.Text = task.Text;
          currentTask.IsCompleted = task.IsCompleted;
          currentTask.IsImportant = task.IsImportant;
          currentTask.IsDeleted = task.IsDeleted;
          Serialize();
          return;
        }
      }
    }

    /// <summary>
    /// Удалить список задач по id.
    /// </summary>
    /// <param name="ids"></param>
    public static void Delete(List<int> ids)
    {
      foreach (Task currentTask in tasks.ToArray())
      {
        foreach (int id in ids)
        {
          if (currentTask.Id == id)
          {
            tasks.Remove(currentTask);
            break;
          }
        }
      }
      Serialize();
    }

    /// <summary>
    /// Получить коллекцию всех задач.
    /// </summary>
    /// <returns>Коллекция всех задач</returns>
    public static IEnumerable<Task> GetAllTasks()
    {
      Deserialize();
      return tasks;
    }

    /// <summary>
    /// Получить задачу по id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Задача.</returns>
    public static Task GetTaskById(int id)
    {
      foreach (Task task in tasks)
      {
        if (id == task.Id)
        {
          return task;
        }
      }
      return new Task();
    }

    #endregion
  }
}