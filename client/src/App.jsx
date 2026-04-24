// client/src/App.jsx

import '@/global.css'
import Button from '@/components/Button'
import EffectsTest from '@/test/effects'

function handleClick() {
  console.log("Button clicked");
}

function App() {
  return (
    <div className='main-wrapper'>
      <h1>Streaming Service</h1>
      <Button label={"Join Now"} onClick={handleClick}/>
      <EffectsTest/>
    </div>
  );
}

export default App
