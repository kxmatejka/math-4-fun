import React, {useRef, useState} from 'react'
import {Layer, Circle} from 'react-konva'
import {BaseCanvas} from '../../../components/canvas'
import {Point} from '../../../types'
import {useMoveToDirection} from '../../../effects'

const handleCanvasClick = (setState: Function) => (event) => {
  const {
    layerX: x,
    layerY: y
  } = event.evt

  setState({x, y})
}

const MoveToDirection = () => {
  const [target, setTarget] = useState<Point>({x: 250, y: 250})
  const circle = useRef(null)

  useMoveToDirection()(target, circle)

  return (
    <>
      <p>
        Click to change the trajectory
      </p>
      <BaseCanvas onClick={handleCanvasClick(setTarget)}>
        <Layer>
          <Circle radius={10} x={50} y={50} fill={'#000'} ref={circle}/>
          <Circle radius={10} x={target.x} y={target.y} fill={'#ff3400'}/>
        </Layer>
      </BaseCanvas>
    </>
  )
}

export {
  MoveToDirection
}
