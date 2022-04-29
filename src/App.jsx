import React from "react";
import { Routes, Route } from "react-router";

import Main from "./Main";
import Detail from "./Detail";

function App(){
    return (
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path={'/:id'} element={<Detail/>}/>
        </Routes>
    )
}
export default App;
