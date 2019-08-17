import React, {useEffect, useRef} from 'react'
import Konva from 'konva'
import {Layer, Circle} from 'react-konva'
import {BaseCanvas} from '../../../components/canvas'

export const BouncingOffWalls = () => {
  const ball = useRef(null)
  let velocityX = 5
  let velocityY = 3

  useEffect(() => {
    const animation = new Konva.Animation(() => {
      const x = ball.current.x()
      const y = ball.current.y()

      if (x > 500 || x < 0) {
        velocityX *= -1
      }

      if (y > 500 || y < 0) {
        velocityY *= -1
      }

      ball.current.x(x + velocityX)
      ball.current.y(y + velocityY)
    }, ball.current.getLayer())

    animation.start()

    return () => animation.stop()
  }, [])

  return (
    <BaseCanvas>
      <Layer>
        <Circle radius={10} fill={'#000'} x={50} y={50} ref={ball} />
      </Layer>
    </BaseCanvas>
  )
}
