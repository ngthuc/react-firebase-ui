import React, {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Loading from "./components/loading";

const Page404 = lazy(() => import("./pages/Page404"));
const SignInPage = lazy(() => import("./pages/SignInPage"));

const App = () => {

    return (
        <div>
            <h1>My App</h1>
            <BrowserRouter>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="login" element={<SignInPage/>}/>
                        <Route path="*" element={<Page404 />}/>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </div>
    );
}

export default App;
