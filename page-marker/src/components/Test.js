import React from "react";
import "./Test.css";
import SketchField from "./Canvas";
import { useEffect } from 'react';
import EraserPng from '../img/eraser-color-icon.svg';

function Foreground( {setCursorType}) {

  const [activeTool, setActiveTool] = React.useState("pen");
  const [activeToolThickness,setMarkerThickness] = React.useState({ pen: 5, eraser:10, highlighter:20});
  const [color, setColor] = React.useState("#000000");
  const [currThickness, setCurrThickness] = React.useState(5);

    useEffect(() => {
      if(activeTool === "pen"){
        setCursorType('crosshair');
        let temp = activeToolThickness.pen;
        temp = temp*10 - 10;
        setCurrThickness(temp);
      }
      else if(activeTool === "highlighter"){
        setCursorType(`url(${EraserPng}})`);
        let temp = activeToolThickness.highlighter;
        temp = temp*5 - 50;
        setCurrThickness(temp);
      }
      else if(activeTool === "eraser"){
        setCursorType()
        let temp = activeToolThickness.eraser;
        temp = temp*4 - 20;
        setCurrThickness(temp);
      }
      else{
        setCurrThickness(5);
      }
      if(activeTool === "text"){
        setCursorType('text');
      }
      if(activeTool === "pointer"  || activeTool === "save" || activeTool === "undo" || activeTool === "redo" || activeTool === "clear" || activeTool === "exit"){
        setCursorType('default');
      }
    }, [activeTool])
    
    const setThicknessOfEachTool = (thicknessObj) => {
        setMarkerThickness(thicknessObj);
    }

    const setThicknessHandler = (e) => {
        let thicknessObj = {...activeToolThickness};
        
        if(activeTool === "pen"){
          thicknessObj.pen = 1 + (e.target.value/10);
        }
        else if(activeTool === "highlighter"){
          thicknessObj.highlighter = 10 + (e.target.value/5);
        }
        else if(activeTool === "eraser"){
          thicknessObj.eraser = 5 + e.target.value/4;
        }

        setThicknessOfEachTool(thicknessObj);
      }

  return (
    <>
      <div style={styles.main}>
        <div id="pageMarker_draggable">
          <div id="pageMarker_color">
            <div className="pageMarker_title">Color</div>
            <input id="pageMarker_colorSelect" type="color" onChange={(e)=>setColor(e.target.value)}/>
          </div>
          <div id="pageMarker_tools">
            <div className="pageMarker_title pageMarker_toolsTitle">Tools</div>
            <div className="pageMarker_toolDiv">
              <a
                id="pageMarker_pen"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("pen")}
                style={{
                  background: activeTool === "pen" ? "rgba(0, 0, 0, 0.2)" : "",
                }}
              >
                <img
                  id="pageMarker_penImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Marker"
                  title="Marker"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/marker.png"
                />
              </a>
              <a
                id="pageMarker_highlighter"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("highlighter")}
                style={{
                  background:
                    activeTool === "highlighter" ? "rgba(0, 0, 0, 0.2)" : "",
                  
                }}
              >
                <img
                  id="pageMarker_highlighterImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Highlighter"
                  title="Highlighter"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/highlighter.png"
                />
              </a>
              <a
                id="pageMarker_eraser"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("eraser")}
                style={{
                  background:
                    activeTool === "eraser" ? "rgba(0, 0, 0, 0.2)" : "",
                    
                }}
              >
                <img
                  id="pageMarker_eraserImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Eraser"
                  title="Eraser"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/eraser.png"
                />
              </a>
              <a
                id="pageMarker_pointer"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("pointer")}
                style={{
                  background:
                    activeTool === "pointer" ? "rgba(0, 0, 0, 0.2)" : "",
                    
                }}
              >
                <img
                  id="pageMarker_pointerImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Pointer"
                  title="Pointer"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/pointer.png"
                />
              </a>
              <a
                id="pageMarker_text"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("text")}
                style={{
                  background: activeTool === "text" ? "rgba(0, 0, 0, 0.2)" : "",
                  
                }}
              >
                <img
                  id="pageMarker_textImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Text"
                  title="Text"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/text.png"
                />
              </a>
              
              <a
                id="pageMarker_save"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("save")}
                style={{
                  background: activeTool === "save" ? "rgba(0, 0, 0, 0.2)" : "",
                  
                }}
              >
                <img
                  id="pageMarker_saveImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Save"
                  title="Save Drawing"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/save.png"
                />
              </a>
              <a
                id="pageMarker_undo"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("undo")}
                style={{
                  background: activeTool === "undo" ? "rgba(0, 0, 0, 0.2)" : "",
                  opacity: 0.3,
                  
                }}
              >
                <img
                  id="pageMarker_undoImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Undo"
                  title="Undo"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/undo.png"
                />
              </a>
              <a
                id="pageMarker_redo"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("redo")}
                style={{
                  background: activeTool === "redo" ? "rgba(0, 0, 0, 0.2)" : "",
                  opacity: 0.3,
                  
                }}
              >
                <img
                  id="pageMarker_redoImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Redo"
                  title="Redo"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/redo.png"
                />
              </a>
              <a
                id="pageMarker_clear"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("clear")}
                style={{
                  background:
                    activeTool === "clear" ? "rgba(0, 0, 0, 0.2)" : "",
                    
                }}
              >
                <img
                  id="pageMarker_clearImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Clear"
                  title="Clear"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/clear.png"
                />
              </a>
              <a
                id="pageMarker_exit"
                className="pageMarker_tool"
                onClick={(e) => setActiveTool("exit")}
                style={{
                  background: activeTool === "exit" ? "rgba(0, 0, 0, 0.2)" : "",
                  
                }}
              >
                <img
                  id="pageMarker_exitImg"
                  className="pageMarker_icon"
                  style={styles.img}
                  alt="Exit"
                  title="Exit"
                  src="chrome-extension://jfiihjeimjpkpoaekpdpllpaeichkiod/exit.png"
                />
              </a>
            </div>
          </div>
          <div id="pageMarker_size">
            <div className="pageMarker_title">Size</div>
            <input
              type="range"
              id="pageMarker_thicknessSlider"
              min="1"
              max="100"
              onChange={setThicknessHandler}
              defaultValue={currThickness}
              key={currThickness}
            />
          </div>
        </div>
        <SketchField activeTool={activeTool} setActiveTool={setActiveTool} color={color} activeToolThickness={activeToolThickness} />
      </div>
      
    </>
  );
}

const styles = {
  main: {
    position: "relative",
    right: "0%",
    top: "0%",
    
  },
  img: {
    width: "30px",
  },
};

export default Foreground;
