import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Router from "./routes";

const App = ({baseUrl}) => (
    <BrowserRouter basename={baseUrl}>
        <Router />
    </BrowserRouter>
);

export default App;
