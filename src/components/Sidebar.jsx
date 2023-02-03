import { useState } from "react"
import { ReactTree } from '@naisutech/react-tree'
import Details from './sidebar/Details.jsx'
import myThemes from './sidebar/TreeThemes'

import NewObjectPopup from'./popups/newObject.jsx'
import NewSpritePopup from'./popups/newSprite.jsx'

function Sidebar( props ){

  const baseNodes = [
  {
    "id": 1,
    "parentId": null,
    "label": "⮞ Sprites",
    "items": null
  },
  {
    "id": 2,
    "parentId": null,
    "label": "⮞ Objects",
    "items": null
  }
,
  {
    "id": 3,
    "parentId": null,
    "label": "⮞ Scenes",
    "items": null
  }
]
  const data = [
          ...baseNodes,
          ...props.gameSprites.map( (gs, i) => {
            return {
              id: baseNodes.length+i+1,
              parentId: 1,
              label: gs.name,
              items: null           }
          } ),
          ...props.gameObjects.map( (go, i) => {
            return {
              id: baseNodes.length+props.gameSprites.length+i+1,
              parentId: 2,
              label: go.name,
              items: null,
              kId: go.id
            }
          } )
        ]

  
  const containerStyles : React.CSSProperties = {
    "marginLeft": "10px",
  }
  
const onSelect = selectedNode => {

  if( selectedNode.length == 0 ){
    return
  }
  
  let selected = data.find( node => node.id == selectedNode[0] )
  if( !selected ){
    console.log("node not found")
    console.log(data, selectedNode)
    return
  }

  if( selected.parentId == 2 ){ //Is Object
    props.changeFocusDetail( selected.kId )

  }

}


  return (
    <div className="sidebar">
      <div className="addBtns">
        <NewObjectPopup
          trigger={<button>Add Object</button>}
          addGameObject={props.addObject} 
          gameSprites={ props.gameSprites }
        />
        <NewSpritePopup
          trigger={<button>Add Sprite</button>}
          addSprite={props.addSprite}
        />
      </div>
      <ReactTree 
        nodes={data} 
        defaultOpenNodes={[1,2,3]}
        onToggleSelectedNodes={ onSelect }
        theme="dark"
        noIcons={true}
        containerStyles={
          containerStyles
        }
        themes={myThemes}/>
      <Details
        focusDetail={ props.focusDetail }
        gameSprites={props.gameSprites}
        gameObjects={ props.gameObjects }
      />
    </div>

  )

}

export default Sidebar
