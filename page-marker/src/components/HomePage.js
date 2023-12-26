import { useEffect } from 'react';
import { useState } from 'react';
import Header from './Header';
import Foreground from './Test';

const HomePage = () => {
    const [cursor, setCursorType] = useState("default");

    const setCursor = (cursorType) => {
        setCursorType(cursorType)
    }

    
  return (
    <div className='bg-[#f2f6fc]' style={{cursor: cursor}}>
      <Header/>
      <Foreground setCursorType = {setCursor}/>
      
    </div>
  );
};

export default HomePage;