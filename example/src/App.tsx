import React, {useEffect} from 'react';
import FirebaseDemo from "./FirebaseDemo";
import ReactGA from "react-ga";
import {injectDebugger} from "./debugger";

const App = () => {
    ReactGA.event({
        category: 'App',
        action: 'Initialize',
    });

    useEffect(() => {
        const initial = async () => {
            await injectDebugger();
        }
        initial();
    }, []);

    return <FirebaseDemo />;
}

export default App;