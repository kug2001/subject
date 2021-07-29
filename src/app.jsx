import './app.css';
import Login from './components/login/login';
import Home from './components/home/home';
import Enroll from './components/enroll/enroll';
import Post from './components/post/post';
import ClassList from './components/classList/classList';
import { Switch, Route} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

function App({firebase}) {
  const history = useHistory();
  const [ userId, setUserId ] = useState('');
  const [ path, setPath ] = useState(false);
  const [ item, setItem ] = useState('');

  useEffect(() => {
    firebase.authObserver(user => {
      if(user){
        setUserId(user.uid);
        history.push('/class-List');
      }
      else{
        history.push('/');
      }
    })
  }, [firebase, history]);

  const handleEnroll = (path, item) => {
    setPath(path);
    setItem(item);
    history.push(`/enroll`);
  }

  return (
    <>
      <Switch>
        <Route path="/sign-In">
          <Login 
            firebase={firebase} 
          />
        </Route>
        <Route path="/post">
          <Post 
            firebase={firebase} 
            user={userId}/>
        </Route>
        <Route path={`/enroll`}>
          <Enroll 
            firebase={firebase} 
            user={userId} 
            path={path} 
            item={item} 
          />
        </Route>
        <Route path="/class-List">
          <ClassList 
            firebase={firebase} 
            user={userId}
            enroll={handleEnroll}
          />
        </Route>
        <Route path="/" exact={true}>
          <Home 
            firebase={firebase} 
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
