import './index.css';
import {useState,useEffect} from 'react';
import{BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header';

import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

import Footer from './components/Footer';

function App() {
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks, setTasks]=useState([]);

  useEffect(()=>{
    const getTasks=async()=>{
      const tasksFromServer=await fetchTasks()
      setTasks(tasksFromServer)
    }
   getTasks()
  },[])//no dependency

// console.log(tasks.text);

//Fetch tasks
const fetchTasks=async()=>{
  const res=await fetch('http://localhost:5000/tasks')
  const data =await res.json();
 //  console.log(res)
 //  console.log(data);
return data;
}

//fetch task
const fetchTask=async(id)=>{
  const res=await fetch(`http://localhost:5000/tasks/${id}`)
  const data =await res.json();
return data;
}

//Add Task tO SERVER
const addTask= async(task)=>{
const res=await fetch('http://localhost:5000/tasks',{
  method:'POST',
  headers:{
    'Content-type':'application/json'
  },
  body:JSON.stringify(task)
})
const data= await res.json()
setTasks([...tasks,data])
}
// const addTask=(task)=>{
//   const id=Math.floor(Math.random()*10000)+1
// // console.log(id);
// const newtask={id,...task}
// setTasks([...tasks,newtask])
// }

//Delete task from server
const deleteTask= async(id)=>{
  await fetch(`http://localhost:5000/tasks/${id}`,{method:'DELETE'})
  setTasks(tasks.filter((task)=>task.id!==id))
  }

// const deleteTask=(id)=>{
// // console.log('deletess',id);
// setTasks(tasks.filter((task)=>task.id!==id))
// }

//Toggle reminder from server update reminder
const toggleReminder=async(id)=>{
  const taskToToggle = await fetchTask(id);
  const updTask={...taskToToggle,reminder:!taskToToggle.reminder}
  const res=await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method:'PUT',
    headers:{
      'Content-type':'application/json'
    },
    body:JSON.stringify(updTask)
  })
  const data= await res.json()
  setTasks(tasks.map((task)=>
  task.id===id ? {...task,reminder:!data.reminder}:task
  ))
  }

// //Toggle reminder
// const toggleReminder=(id)=>{
// // console.log('toggle',id);
// setTasks(tasks.map((task)=>
// task.id===id ? {...task,reminder:!task.reminder}:task
// ))
// }
  return (
    <Router>
    <div className="container">
    <Header title='Task Tracker' onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask} ></Header>
    <Routes>
          <Route
            path='/'
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            }
          />
          <Route path='/about' element={<About />} />
        </Routes>
<Footer></Footer>
    </div>
    </Router>
  );
 
}

export default App;
