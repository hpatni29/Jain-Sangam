import React from "react";
import Gurus from "./components/Gurus";
import Temples from "./components/Temples";
import Users from "./components/Users";
import AIQuestion from "./components/AIQuestion";

function App() {
  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Digamber Jain Community</h1>
      
      <AIQuestion />
      
      <div className="my-6 border-b"></div>
      
      <Gurus />
      
      <div className="my-6 border-b"></div>
      
      <Temples />
      
      <div className="my-6 border-b"></div>
      
      <Users />
    </div>
  );
}

export default App;
