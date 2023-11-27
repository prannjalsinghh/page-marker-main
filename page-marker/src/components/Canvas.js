import { useEffect, useRef, useState } from "react";
import useWindowSize from "./useWindowSize";
import {
  penOnMouseDownhandler,
  penOnMouseMoveHandler,
} from "../controller/pen";
import {
  highlighterOnMouseDownhandler,
  highlighterOnMouseMoveHandler,
} from "../controller/Highlighter";
import {
  eraserOnMouseDownhandler,
  eraserOnMouseMoveHandler,
} from "../controller/Eraser";
import { useSelector } from "react-redux";
import { canvasPush, canvasRedo, canvasUndo } from "../controller/undo&Redo";
import useWindowScroll from "./scrollHandler";

const SketchField = ({
  activeTool,
  setActiveTool,
  color,
  activeToolThickness,
}) => {
  const canvasRef = useRef(null);

  const [width, height] = useWindowSize();
  const {left,top} = useWindowScroll();
  const [hasInput, setHasInput] = useState({ value: false, element: null });
  const [painting, setPainting] = useState(false);
  const [doubleClick, setDoubleClick] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    lastX: null,
    lastY: null,
  });
  const [canvasPushArray, setCanvasPushArray] = useState([]); 
  const [cStep,setcStep] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (activeTool === "clear") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvasPush(canvas,ctx,canvasPushArray,setCanvasPushArray,cStep,setcStep);
      setActiveTool("pen");
    } else if (activeTool === "save") {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const link = document.createElement("a");
      link.download = "my-image.png";
      link.href = image;
      link.click();
      setActiveTool("pen");
    } else if (activeTool === "undo") {
      canvasUndo(canvas, ctx, canvasPushArray, setCanvasPushArray,cStep,setcStep);
      setActiveTool("pen");
    }
    else if(activeTool === "redo"){
      canvasRedo(canvas, ctx, canvasPushArray, setCanvasPushArray,cStep,setcStep);
      setActiveTool("pen");
    }

  }, [activeTool]);
  useEffect(() => {
    console.log(canvasRef.current?.offsetLeft,canvasRef.current?.offsetTop)
  }, [canvasRef.current?.offsetLeft,canvasRef.current?.offsetTop])
  //text
  const textOnClickHandler = (canvas, e, ctx) => {
    if (hasInput.value) return;
    addInput(e.clientX, e.clientY);
  };

  function addInput(x, y) {
  
    var input = document.createElement("input");

    input.type = "text";
    input.style.position = "fixed";
    input.style.left = x - 4 + "px";
    input.style.top = y - 4 + "px";

    input.onkeydown = handleEnter;

    document.body.appendChild(input);

    input.focus();

    setHasInput({ value: true, element: input });
  }

  //Key handler for input box:
  function handleEnter(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      handleTextSetter(this);
    }
  }

  function handleTextSetter(input) {
    drawText(
      input.value,
      parseInt(input.style.left, 10),
      parseInt(input.style.top, 10)
    );
    document.body.removeChild(input);
    setHasInput({ value: false, element: null });
  }

  //Draw the text onto canvas:
  function drawText(txt, x, y) {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.font = "30px Arial";
    ctx.fillText(txt, x - 4, y - 4);
    canvasPush(canvas,ctx,canvasPushArray,setCanvasPushArray,cStep,setcStep);
    setActiveTool("pen");
  }

  const onMouseDownHandler = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    switch (activeTool) {
      case "pen":
        penOnMouseDownhandler(
          canvas,
          e,
          ctx,
          painting,
          setPainting,
          color,
          mousePosition,
          setMousePosition,
          {left,top}
        );
        break;
      case "highlighter":
        highlighterOnMouseDownhandler(
          canvas,
          e,
          ctx,
          painting,
          setPainting,
          color,
          mousePosition,
          setMousePosition,
          {left,top}
        );
        break;
      case "eraser":
        eraserOnMouseDownhandler(
          canvas,
          e,
          ctx,
          painting,
          setPainting,
          mousePosition,
          setMousePosition,
          {left,top}
        );
        break;
      default:
        break;
    }
  };

  const onMouseMoveHandler = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = color;

    switch (activeTool) {
      case "pen":
        penOnMouseMoveHandler(
          canvas,
          e,
          ctx,
          painting,
          setPainting,
          color,
          mousePosition,
          setMousePosition,
          activeToolThickness.pen,
          {left,top}
        );
        break;
      case "highlighter":
        highlighterOnMouseMoveHandler(
          canvas,
          e,
          ctx,
          painting,
          setPainting,
          color,
          mousePosition,
          setMousePosition,
          activeToolThickness.highlighter,
          {left,top}
        );
        break;
      case "eraser":
        eraserOnMouseMoveHandler(
          canvas,
          e,
          ctx,
          painting,
          setPainting,
          mousePosition,
          setMousePosition,
          activeToolThickness.eraser,
          {left,top}
        );
        break;
      default:
        break;
    }
  };

  const onMouseUpHandler = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setMousePosition({
      lastX: e.pageX - canvas.offsetLeft,
      lastY: e.pageY - canvas.offsetTop,
    });
    setPainting(false);
    canvasPush(canvas,ctx,canvasPushArray,setCanvasPushArray,cStep,setcStep);
  };

  const onClickHandler = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (activeTool === "text" && !hasInput.value) {
      textOnClickHandler(canvas, e, ctx);
    } else if (activeTool === "text" && hasInput.value) {
      handleTextSetter(hasInput.element);
    }
  };

  return (
    <canvas
      id="canvas"
      onMouseDown={onMouseDownHandler}
      width={width}
      height={height}
      onClick={onClickHandler}
      onMouseUp={onMouseUpHandler}
      onMouseMove={onMouseMoveHandler}
      style={{
        border: "1px solid #000000",
        pointerEvents: activeTool === "pointer" ? "none" : "auto",
        userSelect: "none",
        position: "fixed",
        top: "0",
        zIndex: "1000",
      }}
      ref={canvasRef}
      onDoubleClick={(e) => setDoubleClick(true)}
    ></canvas>
  );
};
export default SketchField;
