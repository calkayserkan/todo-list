import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Todo from "./components/todos/Todo";
import { Toaster } from "react-hot-toast";
import {gsap} from 'gsap';
import "./App.css";

function App() {
  
  useEffect(() => {
    
  }, []);
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route exact path="/todo" element={<Todo />}></Route>
      </Routes>
    </>
  );
}

export default App;
