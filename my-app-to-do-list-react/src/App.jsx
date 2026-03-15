import { useState } from "react";
import Button from "./components/ui/Button/Button";
import Input from "./components/ui/Input/Input";
import TaskList from "./components/ui/AllList/AllList";

function App() {

  const [taskText, setTaskText] = useState(""); 
  const [taskList, setTaskList] = useState([]);

  const handleAdd = () =>{
    if (taskText.trim() === "")return;
    setTaskList([...taskList,taskText]);
    setTaskText("");
  };


  const handleDelete = () =>{
    setTaskList([]);
  };

  return(
    <div className="app-container">
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

      <TaskList tasks={taskList}></TaskList>
    </div>
  )

  
}
export default App;