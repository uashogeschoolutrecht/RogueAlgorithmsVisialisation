import './styles/App.css';
import {ToolBar} from './components/ToolBar';
import { Graphcontainer } from './components/GraphContainer';
import { ModalProvider } from './components/modal/ModalProvider';

const App = () =>{
  return (
    <div className="App">
      <header className='App-header'>
        <ToolBar />
      </header>
      <main className='App-container'>
        <ModalProvider>
          <Graphcontainer />
        </ModalProvider>
      </main>
    </div>
  );
}
export default App;