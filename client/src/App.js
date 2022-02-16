import './App.scss';
import Lounge from "./page/LoungePage";
import { SocketContext, socket } from './context/socket';


function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Lounge />
    </SocketContext.Provider>
  );
}

export default App;


/**
 * 
 * Huge shoutout to https://www.lofi.cafe/.
 * 
 */