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

      const currentX = rotatingCircle.current.x()
      const currentY = rotatingCircle.current.y()

      const x = 100 + Math.cos(angle) * (currentX - 100) - Math.sin(angle) * (currentY - 100)
      const y = 100 + Math.sin(angle) * (currentX - 100) + Math.cos(angle) * (currentY - 100)

      rotatingCircle.current.x(x)
      rotatingCircle.current.y(y)
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
