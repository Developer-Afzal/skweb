
import './App.css';
import AppRoute from './Components/AppRouting'
import {SnackbarProvider}  from './Context/SnackbarContext';
function App() {
 

  return (
    <>
      <SnackbarProvider>
        <AppRoute/>
      </SnackbarProvider>
    </>
  );
}

export default App;
