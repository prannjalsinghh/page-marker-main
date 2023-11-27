import logo from '../img/icon.png'
import Button from '../UI/Button'
import {useSelector} from 'react-redux'
const Header= (props) => {
    
    return (
        <div className="flex justify-between items-center text-[rgb(38,154,242)] text-[40px] ">
            <div className='flex ml-[20px] gap-[3px]'>
                <img src={logo} width='40px' />
                <h1>Verse</h1>
            </div>
            <div className='mr-[20px]'>
                {props.isLoggedIn && <Button name='Sign Up' className='text-[20px]' width="80px" height="40px" />}
            </div>
        </div>     
    )
}

export default Header;