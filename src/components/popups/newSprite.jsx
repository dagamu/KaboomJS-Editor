import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popup.css'

import { useState } from "react"

function NewSpritePopup( props ){

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

  const FR = new FileReader();

const handleFileChange = async (e) => {
  let newUrl = await convertBase64(e.target.files[0]) 
  let newSprite = () => {
    let spriteName = e.target.value.split('\\').splice(-1)[0]
    spriteName = spriteName.split('.')[0]
    return {name: spriteName , url: newUrl }
  }
  props.addSprite( newSprite() )
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
        <div className="header"> New Sprite </div>
        <div className="popupBody">
          <input type="file" onChange={handleFileChange}/>
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
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

export default NewSpritePopup

