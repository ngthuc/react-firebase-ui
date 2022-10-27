import React from 'react';
import FirebaseDemo from "./FirebaseDemo";
import ReactGA from "react-ga";

const App = () => {
    ReactGA.event({
        category: 'App',
        action: 'Initialize',
    });

    return <FirebaseDemo />;
}

export default App;