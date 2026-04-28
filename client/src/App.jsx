// client/src/App.jsx

import '@/global.css'
import Button from '@/components/Button'
import EffectsTest from '@/test/effects'
import CleanupTest from './test/cleanup';
import TodoList from './test/todo-list';
import CryptoTracker from './test/crypto-tracker';

function handleClick() {
  console.log("Button clicked");
}

function App() {
  return (
    <div className='main-wrapper'>
      <h1>Streaming Service</h1>
      <Button label={"Join Now"} onClick={handleClick}/>
      <CryptoTracker/>
    </div>
  );
}

export default App
