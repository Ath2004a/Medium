// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from "./pages/Signin"; 
import { Signup } from "./pages/Signup"; 
import { Blog } from "./pages/Blog"; 
import { Blogs } from "./pages/Blogs"; 
import { Publish } from "./pages/Publish";




function App()
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route> 
        <Route path="/blog/:id" element={<Blog></Blog>}></Route>
        <Route path="/blogs" element={<Blogs></Blogs>}></Route>
        <Route path="/publish" element={<Publish/>}></Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
