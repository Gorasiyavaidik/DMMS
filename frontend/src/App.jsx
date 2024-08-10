import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import DashBoard from './pages/Dashboard/DashBoard.jsx';
import SignIn from './pages/Authentication/SignIn.jsx';
import SignUp from './pages/Authentication/SignUp.jsx';
import Loader from './common/Loader';
import routes from './routes';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState(true);
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setTokenExists(!!token); // Set tokenExists to true if token exists
    setLoading(false);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/" element={tokenExists ? <Navigate to="/" /> : <Navigate to="/auth/signin" />} />
        <Route path="/auth/signin" element={tokenExists ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/auth/signup" element={tokenExists ? <Navigate to="/" /> : <SignUp />} />
        <Route element={tokenExists ? <DefaultLayout /> : <Navigate to="/auth/signin" />}>
          <Route index element={<DashBoard />} />
          {routes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
