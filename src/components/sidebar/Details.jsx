import { useState } from 'react';

function Details( props ){

  var fd = props.focusDetail
  var fdSprite = fd ? props.gameSprites.find(
    s => {
      let fdSpriteName = fd.inspect().sprite.replaceAll('"','')
       return s.name == fdSpriteName
    } ) : {url:"", name:""}
  var fdName = fd ? fd.name: ""
  var fdPos = fd ? fd.pos.x+', '+fd.pos.y : "0, 0"

  return (
    <div className="Details">
      <span> Name: { fdName }</span>
      <div className="Sprites">

        <div className="Sprite">
          <img src={fdSprite.url}/>
        </div>
          <div className="spriteDetails">
            <span>Sprite: {fdSprite.name}</span> 
          </div>
        
      </div>
      <span>Position: { fdPos }</span>
    </div>
  )
}

export default Details
