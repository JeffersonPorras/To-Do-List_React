import { useState } from "react";
import Button from "./components/ui/Button/Button";
import Input from "./components/ui/Input/Input";
import TaskList from "./components/ui/AllList/AllList";
import Sidebar from "./components/ui/menu/Sidebar";

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const [taskText, setTaskText] = useState(""); 
  const [taskList, setTaskList] = useState([]);


  const handleAdd = () =>{
    if (taskText.trim() === "")return;
    setTaskList([...taskList,taskText]);
    setTaskText("");
  };

  const deleteItem = (index) =>{
    const newList = taskList.filter((_, indexActual) => indexActual !==index)
    setTaskList(newList);
  }

  function handleDelete() {
    setTaskList([]);
  }

  return(
    <div className="app-container">

      <button className="menu-trigger" onClick={toggleMenu}>
        ☰
      </button>

      <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu}/>

      <h1>My To Do List App</h1>

      <section>
        <Input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="What needs to be done?"
        >
        </Input>
      </section>


      <Button onClick={handleAdd} color="green">    
        Add New Task
      </Button>

      <Button onClick={handleDelete} color="red">
        Delete All                                    
      </Button>

      <TaskList tasks={taskList} onDelete ={deleteItem}></TaskList>
    </div>
  )

  
}
export default App;