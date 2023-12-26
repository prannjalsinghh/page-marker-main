import logo from "../img/icon.png";
import Button from "../UI/Button";
import { useSelector } from "react-redux";
import "./header.css";
import { Link } from "react-router-dom";
const Header = (props) => {
    const redirectHandler = () =>{
        window.location = "https://github.com/prannjalsinghh/page-marker-main";
    }
  return (
    <header>
    <div className="flex justify-between items-center  ">
      <div class="overlay">
        <h1>Page Marker Background</h1>
        <h3>It could work on any website</h3>
        <p>
        An extension built on the MERN Stack that enables you to annotate existing webpages by creating notes,
highlighting content, or sketching test cases. You can easily revisit and edit your previously drawn canvases whenever
necessary
        </p>
        <Link to={{ pathname: "https://github.com/prannjalsinghh/page-marker-main" }} target="_blank" ><button onClick={redirectHandler}>READ MORE</button></Link>

      </div>
    </div>
    </header>
  );
};

export default Header;
