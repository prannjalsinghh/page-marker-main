// import addImage from '../img/addicon.png';
const Button=(props)=>{
    return (
        <button className={` ${props.className} bg-[rgb(38,154,242)] text-white rounded-lg w-[${props.width}] h-[${props.height}] text-[${props.text}]`}  onClick={props.onClick}>
            <div className='flex justify-center items-center text-center' style={{cursor:"pointer"}}>
                {/* {props.name==='New' && <img src={addImage}/>} */}
                {<p>{props.name}</p>}
            </div>
        </button>
    );
}
export default Button;