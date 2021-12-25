import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import { UserProvider } from 'contexts/UserProvider';
import Dashboard from 'components/dashboard/Dashboard';
import AnnouncePickup from 'components/dashboard/AnnouncePickup';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/authenticate" component={Auth} />
        <Route path="/dashboard/announce">
          <UserProvider>
            <AnnouncePickup />
          </UserProvider>
        </Route>
        <Route path="/dashboard">
          <UserProvider>
            <Dashboard />
          </UserProvider>
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
