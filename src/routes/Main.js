import React from "react";
import { Switch, Route } from "react-router-dom";
import CanvasContainer from "../components/models/CanvasContainer"

const Main = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={CanvasContainer} />
            </Switch>
        </div>
    )
}

export default Main