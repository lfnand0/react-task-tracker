import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


const SAVED_ITEMS = "savedItems"

const App = () => {
  
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    let savedTasks = JSON.parse(localStorage.getItem(SAVED_ITEMS))
    if(savedTasks){
      setTasks(savedTasks)
    }

  }, [])
  
  useEffect(() => {
    localStorage.setItem(SAVED_ITEMS, JSON.stringify(tasks))
  }, [tasks])




  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])


    console.log(id);
  }



  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {
          ...task, reminder:
            !task.reminder
        } : task
      )
    )
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        'No Tasks To Show'
      )}
    </div>
  );
}

export default App;
