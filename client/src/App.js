
import { useRoutes } from 'react-router-dom';
import './App.css';
import CreateQuote from './components/CreateQuote';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Home from './components/Home';
import OtherUserProfile from './components/OtherUserProfile';
function App() {
  let element = useRoutes([
    {
      path : '/',
      element: <Home/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/signup',
      element: <SignUp/>
    },
    {
      path: '/profile',
      element: <Profile/>
    },
    {
      path: '/create',
      element: <CreateQuote/>
    },
    {
      path: '/profile/:userid',
      element: <OtherUserProfile/>
    }
  ])
  return (
    <div className="App">
      {/*<Login/>*/}
      {/*<SignUp/>*/}
      {/*<Profile/>*/}
      {/*<CreateQuote/>*/}
      <NavBar/>
      {element}
    </div>
  );
}

export default App;
