const Input = (props) => {
    const getValue = (e) => {
        props.onChange(e.target.value);
    }
    return (
        <input type={props.type} className=" border-2 outline-[rgb(38,154,242)] w-[250px] rounded-lg" placeholder={props.placeholder} onChange={getValue} />
    );
}
export default Input;