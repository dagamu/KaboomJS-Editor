import { useState } from 'react';
import Editor from "@monaco-editor/react";
import "../App.css";
import KaboomView from './tabs/KaboomView.jsx'

function Tabs( props ) {
  
  const [toggleState, setToggleState] = useState(1);
  var code = [
    'kaboom()',
    '  ',
    ...props.gameSprites.map( gs => 
      `loadSprite('${gs.name}','${gs.url}')`
    ),
    '  ',
    ...props.gameObjects.map( go =>   
      `var ${go.name} = add([ 
        sprite('${go.sprite}'),
        pos(${go.pos.join(',')})
      ])\n`
    )
  ].join('\n')


  const toggleTab = (index) => {
    setToggleState(index);
  };

  function handleEditorChange(value, event) {
  }

  return (
    <div className="container"> 
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Main
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Code
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <KaboomView 
            changeK={ props.changeK }
            gameSprites={ props.gameSprites }
            gameObjects={ props.gameObjects }
            setGameObjects={ props.setGameObjects }
            changeFocusDetail={ props.changeFocusDetail }
            setFocusDetail={ props.setFocusDetail }
            focusDetail={ props.focusDetail }
            addGameObject={ props.addGameObject }
            updateObject={ props.updateObject }
          />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="kaboom()"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{readOnly: true}}

   />
        </div>

      </div>
    </div>
  );
}

export default Tabs;
