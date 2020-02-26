using System.Collections.Generic;
using System.Linq;

namespace WebServer.Models
{
  public class TasksSorter : TasksEditor
  {
    /// <summary>
    /// Получить коллекцию важных задач.
    /// </summary>
    /// <returns>Коллекция важных задач.</returns>
    public static IEnumerable<Task> GetImportanceTasks()
    {
      return tasks.Where(task => task.IsImportant);
    }

    /// <summary>
    /// Получить коллекцию выполненных задач.
    /// </summary>
    /// <returns>Коллекция выполненных задач.</returns>
    public static IEnumerable<Task> GetCompletedTasks()
    {
      return tasks.Where(task => task.IsCompleted);
    }
  }
}