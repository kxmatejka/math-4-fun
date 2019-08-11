import React, { useContext, useEffect, useRef } from 'react'
import Konva from 'konva'
import { Layer, Circle } from 'react-konva'
import { BaseCanvas, BaseCanvasSizeContext } from '../../../components/canvas'

const RotateAroundPoint = () => {
  const rotatingCircle = useRef(null)
  const [canvasWidth, canvasHeight] = useContext(BaseCanvasSizeContext)

  useEffect(() => {
    const animation = new Konva.Animation(() => {
      const angle = 1.5 * Math.PI / 180

      const x = rotatingCircle.current.x() - 100
      const y = rotatingCircle.current.y() - 100

      const sin = Math.sin(angle)
      const cos = Math.cos(angle)

      rotatingCircle.current.x(100 + cos * x - sin * y)
      rotatingCircle.current.y(100 + sin * x + cos * y)
    }, rotatingCircle.current.getLayer())

    animation.start()

    return () => animation.stop()
  }, [])

  return (
    <BaseCanvas>
      <Layer>
        <Circle radius={25}
                x={canvasWidth / 2} y={canvasHeight / 2}
                fill={'#ffda22'}
        />
        <Circle radius={10}
                x={0} y={0}
                offsetX={-150} offsetY={-150}
                fill={'#3487ff'}
                ref={rotatingCircle}
        />
      </Layer>
    </BaseCanvas>
  )
}

export {
  RotateAroundPoint
}
