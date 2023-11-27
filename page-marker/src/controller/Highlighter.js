const highlighterOnMouseDownhandler = (canvas,e,ctx,painting,setPainting,color,mousePosition,setMousePosition,{left,top}) => {
    setPainting(true);

    setMousePosition({
      lastX: e.pageX - canvas.offsetLeft-left,
      lastY: e.pageY - canvas.offsetTop-top,
    });
  }

  const highlighterOnMouseMoveHandler = (canvas,e,ctx,painting,setPainting,color,mousePosition,setMousePosition,thickness,{left,top}) => {
    if (painting) {
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = "#ff0";
      
      ctx.fillRect(e.pageX-10-left, e.pageY-10-top, 20,thickness);
    }
  }

  export {highlighterOnMouseDownhandler,highlighterOnMouseMoveHandler};