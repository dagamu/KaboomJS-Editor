import kaboom from "kaboom"
import * as React from "react"

const KaboomView: React.FC = ( props ) => {

	const canvasRef = React.useRef(null)

	// just make sure this is only run once on mount so your game state is not messed up
	React.useEffect(() => {

		const k = kaboom({
			global: false,
			canvas: canvasRef.current,
			background: [ 30, 30, 40 ],
		})

		let curDraggin = null

		props.changeK(k)

		k.drag = () => {
			let offset = k.vec2(0)
			return {
				id: "drag",
				require: [ "pos", "area", ],
				add() {
					this.onClick(() => {
						if (curDraggin) {
							return
						}
						curDraggin = this
						offset = k.mousePos().sub(this.pos)
						k.readd(this)
					})
				},
				update() {
					if (curDraggin === this) {
						k.cursor("move")
						this.pos = k.mousePos().sub(offset)
						props.updateObject( this._id, this )
					}
				},
			}
		}

		props.gameSprites.forEach( gs => {
			k.loadSprite( gs.name, gs.url )
		} )

		var objectList = k.add([ k.text('No Objects', {size: 20}), k.pos(k.width() - 200,50) ])
		var updateOL = () => objectList.text = k.get().map( ob => ob.inspect().sprite).join('\n') 

		props.gameObjects.map( (go) =>
			props.addGameObject( go, k, [k.drag], true ) )

		k.onUpdate( () => {
				updateOL()
		} )



		k.onMouseRelease(() => {
			curDraggin = null
		})




	}, [])


	return <canvas ref={canvasRef} className="kaboomView"></canvas>

}

export default KaboomView
