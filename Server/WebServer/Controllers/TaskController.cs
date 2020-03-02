using System.Collections.Generic;
using System.Web.Http;
using WebServer.Models;

namespace WebServer.Controllers
{
  /// <summary>
  /// Контроллер для манипуляций со списком задач.
  /// </summary>
  public class TaskController : ApiController
  {
    /// <summary>
    /// Получить коллекцию всех задач.
    /// </summary>
    /// <returns>Коллекция всех задач.</returns>
    [HttpGet]
    public IEnumerable<Task> AllTasks()
    {
      return TasksEditor.GetAllTasks();
    }

    /// <summary>
    /// Получить задачу по id.
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Задача.</returns>
    [HttpGet]
    public Task Task([FromUri] int id)
    {
      return TasksEditor.GetTaskById(id);
    }

    /// <summary>
    /// Добавить новую задачу.
    /// </summary>
    /// <param name="task"></param>
    [HttpPost]
    public void Add([FromBody] Task task)
    {
      TasksEditor.Add(task);
    }

    /// <summary>
    /// Редактировать задачу.
    /// </summary>
    /// <param name="task"></param>
    [HttpPost]
    public void Edit([FromBody] Task task)
    {
      TasksEditor.Edit(task);
    }

    /// <summary>
    /// Удалить задачу по id. 
    /// </summary>
    /// <param name="id"></param>
    [HttpPost]
    public void Delete([FromBody] int id)
    {
      TasksEditor.Delete(id);
    }
  }
}
