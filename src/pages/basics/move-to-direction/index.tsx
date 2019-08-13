import React, {useEffect, useRef, useState} from 'react'
import Konva from 'konva'
import {Layer, Circle} from 'react-konva'
import {BaseCanvas} from '../../../components/canvas'
import {Point} from '../../../types'
import {pow2} from '../../../lib'

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

  useEffect(() => {
    const animation = new Konva.Animation(() => {
      const x = circle.current.x()
      const y = circle.current.y()

      const a = target.x - x
      const b = target.y - y
      const c = Math.sqrt(pow2(a) + pow2(b))

      const velocityX = a / c
      const velocityY = b / c

      circle.current.x(x + velocityX)
      circle.current.y(y + velocityY)

    }, circle.current.getLayer())

    animation.start()

    return () => animation.stop()
  }, [target])

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
