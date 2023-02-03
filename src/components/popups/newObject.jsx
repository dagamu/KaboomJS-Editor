import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popup.css'

import { useState } from "react"

function NewObjectPopup( props ){

  const [newObj, setNewObj] = useState({
    name: 'New Object',
    sprite: 'bean',
    pos: [0, 0]
  })

  function handleNameChange(e){
    setNewObj( ob => ({...ob, name: e.target.value}) )
  }

  return(
    <Popup 
      trigger={props.trigger} 
      modal
      nested
    >
      {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> New Object </div>
        <div className="popupBody">
          { '  ' }
          <label>Object Name: <input type='text' id='name' onChange={handleNameChange}/></label>
          <div className="spriteBox">
            <img src={ props.gameSprites.find( gs => gs.name == newObj.sprite ).url}/>
            <div className="dropdown">
              <button className="dropbtn">
                  Sprite
              </button>
              <div className="dropdown-content">
              { props.gameSprites.map( gs => (
                <a href="#" onClick={ () => setNewObj( ob => ({...ob, sprite: gs.name })) }>
                        <img src={ gs.url }
                            width="20" height="20"/> <span>{gs.name}</span></a>

              ) ) } 
                </div>
          </div>
          </div>
        </div>
        <div className="actions">
          <button onClick={ () => props.addGameObject( newObj ) }>Add New Object</button>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Popup>
  )
}

export default NewObjectPopup
