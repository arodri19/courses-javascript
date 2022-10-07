import React, { useState } from 'react';
import Form from '../components/Form'
import List from '../components/List'
import Timer from '../components/Timer';
import { ITask } from '../types/tasks';
import style from './App.module.scss'

function App() {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [selected, setSelected] = useState<ITask>();

  function taskSelect(selectedTask: ITask){
    setSelected(selectedTask);
    setTasks(oldTasks => oldTasks.map(task => ({
      ...task,
      selected: task.id === selectedTask.id ? true : false
    })))
  }

  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks}/>
      <List 
        tasks={tasks}
        taskSelect={taskSelect}/>
      <Timer selected={ selected }/>
    </div>
  );
}

export default App;
