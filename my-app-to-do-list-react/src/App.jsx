import { useState, useEffect } from "react";
import Button from "./components/ui/Button/Button";
import Input from "./components/ui/Input/Input";
import TaskList from "./components/ui/AllList/AllList";
import Sidebar from "./components/ui/menu/Sidebar";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [taskText, setTaskText] = useState(""); 
  const [taskType, setTaskType] = useState("daily");
  const [dueDate, setDueDate] = useState ("");
  const [view, setView] = useState("dashboard"); 

  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : []
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isFormInvalid = taskText.trim().length === 0 || (taskType === "future" && dueDate.length === 0);

  const dailyTask = taskList.filter(t => t.type === "daily" && !t.completed);
  const futureTask = taskList.filter(t => t.type === "future" && !t.completed);
  const completedHistory = taskList.filter( t => t.completed);


  const completedTask = (id) =>{
    const date = new Date().toLocaleDateString();
    const newList = taskList.map( task => task.id === id ? {...task, completed: true, completedAt: date} : task
    );   
    setTaskList(newList);
  };



  const handleAdd = () =>{
    if (taskText.trim() === "")return;

    const newTask = {
      id : Date.now(),
      text: taskText,
      type: taskType,
      completed: false,
      date: taskType === "future" ? dueDate : null,
      completedAt: null 
    };
    setTaskList([...taskList, newTask]);
    setTaskText("");
    setDueDate("");
  };


  const deleteItem = (id) =>{
    const newList = taskList.filter((task) => task.id !== id)
    setTaskList(newList);
  }

  function handleDelete() {
    setTaskList([]);
  }

  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(taskList));
  },[taskList]);

  return(
    
    <><div className="app-container">
      <button className="menu-trigger" onClick={toggleMenu}>
        ☰
      </button>

      <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} setView={setView} />

      <h1>My To Do List App</h1>

      <section className="glass-section">

        <div className="task-selector">
          <label>Tipo de Tarea: </label>
          <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
            <option value="daily">Diaria</option>
            <option value="future">A Futuro</option>
          </select>
          {taskType === "future" && (
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)} />
          )}
          {taskType === "daily" && (
            <p>Estas Tareas se reiniciaran cada mañana.</p>
          )}
        </div>

        <Input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="What needs to be done?"
        >
        </Input>

        <Button
          onClick={handleAdd}
          color={isFormInvalid ? "gray" : "green"}
          disabled={isFormInvalid}
        >
          Add New Task
        </Button>

        <Button onClick={handleDelete} color="red">
          Delete All
        </Button>
      </section>

      <div className="dashboard">

        {view === "dashboard" && (
          <section className="glass-section">
            <h2>🗓️ Tareas Diarias</h2>
            <TaskList tasks={dailyTask} onDelete={deleteItem} onComplete={completedTask} />
          </section>
        )}

        {view === "future" && (
          <section className="glass-section">
            <h2>🚀 Agenda a Futuro</h2>
            <TaskList tasks={futureTask} onDelete={deleteItem} onComplete={completedTask} />
          </section>
        )}

        {view === "history" && (
          <section className="glass-section">
            <h2>✅ Registro de Tareas Realizadas</h2>
            <TaskList tasks={completedHistory} onDelete={deleteItem} isHistory={true} />
          </section>
        )}
      </div>




    </div></>
  )

}

export default App;