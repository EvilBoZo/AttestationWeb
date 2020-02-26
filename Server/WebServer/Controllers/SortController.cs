using System.Collections.Generic;
using System.Web.Http;
using WebServer.Models;

namespace WebServer.Controllers
{
  /// <summary>
  /// Контроллер для выборки задач.
  /// </summary>
  public class SortController : ApiController
  {
    /// <summary>
    /// Получить коллекцию важных задач.
    /// </summary>
    /// <returns>Коллекция важных задач.</returns>
    [HttpGet]
    public IEnumerable<Task> Importance()
    {
      return TasksSorter.GetImportanceTasks();
    }

    /// <summary>
    /// Получить коллекцию выполненных задач.
    /// </summary>
    /// <returns>Коллекция выполненных задач.</returns>
    [HttpGet]
    public IEnumerable<Task> Completed()
    {
      return TasksSorter.GetCompletedTasks();
    }
  }
}
