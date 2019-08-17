import React, {useState, useEffect} from 'react'
import {Layer, Circle} from 'react-konva'
import {BaseCanvas} from '../../../components/canvas'
import {Point} from '../../../types'
import {distance} from '../../../lib'

const handleMouseMove = (setState: Function) => (event) => {
  const {
    x, y
  } = event.target.getStage().getPointerPosition()

  setState({x, y})
}

export const InsideCircle = () => {
  const radius = 100
  const [cursor, setCursor] = useState<Point>({x: 0, y: 0})
  const [color, setColor] = useState('#000')

  useEffect(() => {
    const color = radius >= distance(cursor, {x: 250, y: 250}) ? '#f00' : '#000'
    setColor(color)
  }, [cursor])

  return (
    <>
      <p>
        radius = {radius}
      </p>
      <p>
        cursor x, y = {cursor.x} , {cursor.y}
      </p>
      <BaseCanvas onMouseMove={handleMouseMove(setCursor)}>
        <Layer>
          <Circle radius={radius} x={250} y={250} fill={color} />
        </Layer>
      </BaseCanvas>
    </>
  )
}
