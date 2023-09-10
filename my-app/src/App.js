

import './components/Login'
import LoginPage from './components/Login';
import {getTrains} from './components/getTrains';
function App() {
  return (
    <div className="App">
      <p>john doe railway services!</p>
      <div>
      <LoginPage/>
      </div>
      <div>
        <getTrains/>
      </div>

    </div>
  );
}

export default App;
