using System;

namespace WebServer.Models
{
  /// <summary>
  /// Задача.
  /// </summary>
  [Serializable]
  public class Task
  {
    /// <summary>
    /// Идентификатор.
    /// </summary>
    private int id;
    public int Id
    {
      get { return id; }
      set { id = value; }
    }

    /// <summary>
    /// Текст.
    /// </summary>
    private string text;
    public string Text
    {
      get { return text; }
      set { text = value; }
    }

    /// <summary>
    /// Флаг важности.
    /// </summary>
    private bool isImportant;
    public bool IsImportant
    {
      get { return isImportant; }
      set { isImportant = value; }
    }

    /// <summary>
    /// Флаг завершенности.
    /// </summary>
    private bool isCompleted = false;
    public bool IsCompleted
    {
      get { return isCompleted; }
      set { isCompleted = value; }
    }

    /// <summary>
    /// Флаг удаления.
    /// </summary>
    private bool isDeleted = false;
    public bool IsDeleted
    {
      get { return isDeleted; }
      set { isDeleted = value; }
    }
  }
}