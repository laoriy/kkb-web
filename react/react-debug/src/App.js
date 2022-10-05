import React, { useState } from 'react';
import State from './components/State'
import LanesDemo from './components/LanesDemo'
import AppSibling from './components/AppSibling'
import TasksWithDifferentPriorities from './components/TasksWithDifferentPriorities'
import SchedulerTask from './components/SchedulerTask'
import Concurrent from './components/ConcurrentInput'
import Diff from './components/Diff'
import PropsDiff from './components/PropsDiff'
import Hooks from "./components/Hooks";
import EventDemo from "./components/EventDemo";
import ContextDemo from "./components/Context";
import './App.css';


// setState

class SetSS extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    add = () => {
        this.setState({ count: this.state.count + 1 })
    }
    render() {
        return (<div>
            <button onClick={this.add}>统计：{this.state.count}</button>
        </div>)
    }
}

// propsDiff
/*class App extends React.Component {
  render() {
    return <PropsDiff/>
  }
}*/
function App() {
    // return <SetSS />
    // 事件系统
    // return <EventDemo />

    // return <Hooks/>
    // fiber树
    // return (
    //   <div className="App">
    //     <span className={'app-span'} onClick={() => setCount(count + 1)}>App{count}</span>
    //     <AppSibling count={count}/>
    //   </div>
    // );

    // Scheduler调度任务与用户交互
    // return <SchedulerTask/>

    // 高优先级插队
    //   return <TasksWithDifferentPriorities/>

    // context
    return <ContextDemo />

    // diff 算法
    // return <Diff ref={'diffRef'}/>
}

export default App;
