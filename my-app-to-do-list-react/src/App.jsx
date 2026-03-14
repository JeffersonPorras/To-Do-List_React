import Button from "./components/ui/Button/Button";
import Input from "./components/ui/Input/Input";

function App() {
  const handleAdd = () =>alert("Adding task...");
  const handleDelete = () =>alert("Delete task...");

  return(
    <div>
      <h1>My To Do List App</h1>

      <section>
        <Input></Input>
      </section>


      <Button onClick={handleAdd} color="green">
        Add New Task
      </Button>

      <Button onClick={handleDelete} color="red">
        Delete All
      </Button>
    </div>
  )
}
export default App;