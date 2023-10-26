import './App.css';
import {Route, HashRouter as Router, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SetAvatar from './components/SetAvatar';
import Chat from './components/Chat';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<Chat/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/setavatar' element={<SetAvatar/>} />
        </Routes>
      </Router>
  );
}

export default App;
