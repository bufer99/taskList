import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from 'react-router-dom';
import './App.css';
import { TaskBank } from './components/TaskBank/TaskBank';
import { EditedTask } from './components/EditedTask/EditedTask';
import { Home } from './components/Home';
import { TaskLists } from './components/TaskLists/TaskLists';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { Layout } from './components/Layout';
import { Profile } from './components/Profile';
import { NoMatch } from './components/NoMatch';
import { store } from './state/store';
import { Provider } from 'react-redux';


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/task-bank' element={<TaskBank />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />

            <Route path='/my-tasks' element={<TaskLists />} />
            <Route path='/edited-task' element={<EditedTask />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
