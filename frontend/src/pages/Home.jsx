import { useState, useEffect } from "react";
import api from "../api";
import File from "../components/File"


function Home() {
    return (
        <div className="page homepage">
        <div className="sidebar-wrapper">
            <Sidebar />
        </div>
        <div className="main-wrapper">
            <Switch>
            <Route path="/folders/">
                <MainView />
            </Route>
            <Route exact path="/">
                <MainView />
            </Route>
            </Switch>
        </div>
        </div>
    )
}

export default Home;