function canvasPush(canvas, ctx, canvasPushArray, setCanvasPushArray, cStep,setcStep) {
    setcStep(++cStep);
    if (cStep < canvasPushArray.length) { canvasPushArray.length = cStep; }
    canvasPushArray.push(canvas.toDataURL());
    console.log(canvasPushArray)
    setCanvasPushArray(canvasPushArray);
}

function canvasUndo(canvas, ctx, canvasPushArray, setCanvasPushArray , cStep,setcStep) {
    if(cStep>=0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setcStep(--cStep);
        var canvasPic = new Image();
        canvasPic.src = canvasPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

function canvasRedo(canvas, ctx, canvasPushArray, setCanvasPushArray , cStep,setcStep) {

    if(cStep<canvasPushArray.length-1){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setcStep(++cStep);
        var canvasPic = new Image();
        canvasPic.src = canvasPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
    }
}

export { canvasPush, canvasUndo, canvasRedo };