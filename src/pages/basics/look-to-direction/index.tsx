import React, {useState, useRef} from 'react'
import {Layer, Line, Circle} from 'react-konva'
import {BaseCanvas} from '../../../components/canvas'
import {useMoveToDirection} from '../../../effects'
import {Point} from '../../../types'
import {angleToPoint} from '../../../lib'

const handleCanvasClick = (setState: Function) => (event) => {
  const {
    layerX: x,
    layerY: y
  } = event.evt

  setState({x, y})
}

const rotateToCenter = (movingRef) => {
  const x = movingRef.current.x()
  const y = movingRef.current.y()

  movingRef.current.rotation(angleToPoint({x, y}, {x: 250, y: 250}) + 180)
}

export const LookToDirection = () => {
  const [target, setTarget] = useState<Point>({x: 380, y: 100})
  const ship = useRef(null)

  useMoveToDirection(rotateToCenter)(target, ship)

  return (
    <>
      <p>
        Click to change the trajectory
      </p>
      <BaseCanvas onClick={handleCanvasClick(setTarget)}>
        <Layer>
          <Circle radius={5} x={target.x} y={target.y} fill='#ff3400' />
          <Circle radius={10} x={250} y={250} fill='#000' />
          <Line x={50} y={50} fill='#a920ff' closed={true}
            scaleX={0.3} scaleY={0.3}
            points={[50,0, 90,100, 50,75, 10,100, 50,0]}
            ref={ship}
                offsetX={50}
                offsetY={0}
          />
        </Layer>
      </BaseCanvas>
    </>
  )
}
