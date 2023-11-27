const eraserOnMouseMoveHandler = (canvas,e,ctx,painting,setPainting,mousePosition,setMousePosition,thickness,{left,top}) => {
    if (painting) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";

      let mouseX = e.pageX - canvas.offsetLeft-left;
      let mouseY = e.pageY - canvas.offsetTop-top;
     
      // find all points between
      var x1 = mouseX,
        x2 = mousePosition.lastX,
        y1 = mouseY,
        y2 = mousePosition.lastY;

      var steep = Math.abs(y2 - y1) > Math.abs(x2 - x1);
      if (steep) {
        var x = x1;
        x1 = y1;
        y1 = x;

        var y = y2;
        y2 = x2;
        x2 = y;
      }
      if (x1 > x2) {
        var x = x1;
        x1 = x2;
        x2 = x;

        var y = y1;
        y1 = y2;
        y2 = y;
      }

      var dx = x2 - x1,
        dy = Math.abs(y2 - y1),
        error = 0,
        de = dy / dx,
        yStep = -1,
        y = y1;

      if (y1 < y2) {
        yStep = 1;
      }

      let lineThickness = thickness;

      for (var x = x1; x < x2; x++) {
        if (steep) {
          ctx.fillRect(y, x, lineThickness, lineThickness);
        } else {
          ctx.fillRect(x, y, lineThickness, lineThickness);
        }

        error += de;
        if (error >= 0.5) {
          y += yStep;
          error -= 1.0;
        }
      }

      setMousePosition({ lastX: mouseX, lastY: mouseY });
    }
  };

  const eraserOnMouseDownhandler = (canvas,e,ctx,painting,setPainting,mousePosition,setMousePosition, {left,top}) => {
    setPainting(true);

    setMousePosition({
      lastX: e.pageX - canvas.offsetLeft - left,
      lastY: e.pageY - canvas.offsetTop -top,
    });
  };

  export {eraserOnMouseDownhandler,eraserOnMouseMoveHandler};