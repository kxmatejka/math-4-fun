import React, {useContext, useEffect, useRef, useState} from 'react'
import Konva from 'konva'
import {Layer, Circle} from 'react-konva'
import {BaseCanvas, BaseCanvasSizeContext} from '../../../components/canvas'

const updateSpeed = (setSpeed) => (event) => parseFloat(setSpeed(event.target.value))

const RotateAroundPoint = () => {
  const [speed, setSpeed] = useState(1.5)
  const rotatingCircle = useRef(null)
  const [canvasWidth, canvasHeight] = useContext(BaseCanvasSizeContext)

  useEffect(() => {
    const animation = new Konva.Animation(() => {
      const angle = speed * Math.PI / 180
      const sin = Math.sin(angle)
      const cos = Math.cos(angle)

      const x = rotatingCircle.current.x() - 100
      const y = rotatingCircle.current.y() - 100

      rotatingCircle.current.x(100 + cos * x - sin * y)
      rotatingCircle.current.y(100 + sin * x + cos * y)
    }, rotatingCircle.current.getLayer())

    animation.start()

    return () => animation.stop()
  }, [speed])

  return (
    <>
      <label>
        <p>Speed: {speed * 10} %</p>
        <input type={'range'} min={0} max={10} step={0.1} value={speed} onChange={updateSpeed(setSpeed)}/>
      </label>
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
    </>
  )
}

export {
  RotateAroundPoint
}
