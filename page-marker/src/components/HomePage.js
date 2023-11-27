import { useEffect } from 'react';
import Header from './Header';
import Button from '../UI/Button';
import fileIcon from '../img/fileicon.png';
import folderIcon from '../img/foldericon.png';
import Foreground from './Test';

const HomePage = () => {
    const dummyData={
        files:[
                {
                    name: 'file1',
                },
                {
                    name: 'file2',
                },
                {
                    name: 'file3',
                },
                {
                    name: 'file4',
                },
                {
                    name: 'file5',
                },
                {
                    name: 'file6',
                },
                {
                    name: 'file7',
                },

            ]
        ,
        folders:[
                {
                    name: 'folder1',
                },
                {
                    name: 'folder2',
                },
                {
                    name: 'folder3',
                },
                {
                    name: 'folder4',
                },
                {
                    name: 'folder5',
                },
                {
                    name: 'folder6',
                },
                {
                    name: 'folder7',
                },
            ]
        
    }
    
  return (
    <div className='bg-[#f2f6fc]'>
      <Header/>
      <Foreground/>
      <Button text="Set User" width="50px" height="20px"/>
      <div className='flex'>
        <div className='relative w-[20%] h-[100%] '>
            <Button name='New'  className='w-[90%] h-[50px] mt-[40px]'/>
            <p className='mt-[20px]'>Home</p>
            <p>File Manager</p>
            <p>Shared with you</p>
            <p>Starred</p>
        </div>
        <div className='w-[80%] h-[100%] bg-white rounded-md'>
            <div className='grid grid-cols-4 text-center'>
                {dummyData.files.map((file) => <div><img src={fileIcon}/><p>{file.name}</p></div> )}
                {dummyData.folders.map((folder) => <div><img src={folderIcon}/><p>{folder.name}</p></div> )}
            </div>
        </div>
       </div>
    </div>
  );
};

export default HomePage;