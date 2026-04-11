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
  const [searchText, setSearchText] = useState("");
  const [view, setView] = useState(() =>{
    const savedView = localStorage.getItem("currentView");
    return savedView ? savedView : "dashboard";
  }); 

  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("myTasks");
    return savedTasks ? JSON.parse(savedTasks) : []
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isFormInvalid = taskText.trim().length === 0 || (taskType === "future" && dueDate.length === 0);

  const dailyTask = taskList.filter(t => 
    t.type === "daily" && 
    !t.completed && 
    t.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const futureTask = taskList.filter(t => 
    t.type === "future" && 
    !t.completed &&
    t.text.toLowerCase().includes(searchText.toLowerCase())
  );

  const completedHistory = taskList.filter( t => t.completed && t.type === "future");


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

  const clearDaily = () => {
    const newList = taskList.filter(t => t.type !== "daily");
    setTaskList(newList);
    localStorage.setItem("myTasks", JSON.stringify(newList));
  }
  

  function handleDelete() {
    setTaskList([]);
    localStorage.removeItem("myTasks");
    setView("dashboard")
  }


  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(taskList));
    localStorage.setItem("currentView", view);
  },[taskList, view]);

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

        {view === "dashboard" && 
        <Button onClick={handleDelete} color="red">
          Delete All
        </Button>
        }
        { view === "future" &&
         <Button onClick={handleDelete} color="red">
          Delete All
        </Button>  
        }


        { view === "history" && 
          <Button onClick={handleDelete} color="red">
          Eliminar todo el historial 
        </Button>
        }
      </section>

      <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="buscar tarea"
        >
        </Input>



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