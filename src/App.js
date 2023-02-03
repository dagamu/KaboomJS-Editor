import './App.css';
import Tabs from './components/Tabs.jsx'
import Sidebar from './components/Sidebar.jsx'

import { useState } from "react"


function App() {

  const [k, setKaboomView] = useState()
  const [gameSprites, setGameSprites] = useState([
    {
      name: "bean",
      url: "/sprites/bean.png"
    },
    {
      name: "ground",
      url: "/sprites/grass.png"
    }
  ])
  const [gameObjects, setGameObjects] = useState([
      {
        name: "player",
        sprite: "bean",
        pos: [100,50]
      },
      {
        name: "ground1",
        sprite: "ground",
        pos: [200, 50]
      }
    ])

  const [focusDetail, setFocusDetail] = useState()
  const handleGMObj = ( newGameObjects ) => {
    setGameObjects( newGameObjects )
  }

  const updateObject = (id, newObj ) => {

    setGameObjects( gObjs => {
      let index = gObjs.findIndex( go => id == go.id )
      if(index != -1){
        let objToAdd = {
          ...gObjs[index],
          pos: [newObj.pos.x, newObj.pos.y]
        }
        gObjs[index] = objToAdd
      }
      return gObjs
    })
  }

  const addSprite = ( sprite ) => { 
    k.loadSprite(sprite.name, sprite.url)
    setGameSprites( pGameSprites => [...pGameSprites, { name: sprite.name, url: sprite.url }] )
  }

  const addObject = ( go=gameObjects[0], kb=k, funcs=[k.drag], update=false) => {


    let obj = kb.add([
      kb.sprite(go.sprite),
      kb.pos( go.pos[0], go.pos[1] ),
      kb.area(),
      ...funcs.map( f => f() )
    ])

    obj.name = go.name
    obj.onClick( () => {
      setFocusDetail( obj );
    } )
    go.id = obj._id

    if( !update ){
      setGameObjects( (pGO => {
        return [  
          ...pGO,
          { name: go.name, sprite: go.sprite, pos: go.pos }
      ]
      }) )
    }

  }

  const changeFocusDetail = id => {

    var newObjFocus = k.get().find( go => go._id == id )
    setFocusDetail( newObjFocus )

  }

  return (
    <div className="App">
      <Tabs 
        changeK={setKaboomView}
        gameObjects={gameObjects}
        gameSprites={gameSprites}
        setGameObjects={ handleGMObj }
        changeFocusDetail={ changeFocusDetail }
        setFocusDetail={ setFocusDetail }
        focusDetail={ focusDetail }
        addGameObject={addObject}
        updateObject={ updateObject }
      />
      <Sidebar
        gameObjects={gameObjects}
        gameSprites={gameSprites}
        addSprite={addSprite}
        addObject={addObject}
        changeFocusDetail={ changeFocusDetail }
        focusDetail={ focusDetail }
      />
    </div>
  );
}

export default App;
