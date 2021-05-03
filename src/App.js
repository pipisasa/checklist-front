import React from 'react';
// import ErrorAlerts from './components/ErrorAlerts';
import AddTaskProvider from './contexts/AddTaskContext';
import Routes from './routes';


function App() {
  return (
      <AddTaskProvider>
        <Routes/>
        {/* <ErrorAlerts/> */}
      </AddTaskProvider>
  );
}

export default App;
