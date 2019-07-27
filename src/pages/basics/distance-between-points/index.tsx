import React, { useState, FunctionComponent } from 'react'
import { Stage, Layer, Rect, Circle, Line } from 'react-konva'

type Point = [number, number]

interface CalculateDistanceArguments {
  a: Point,
  b: Point
}

const pow2 = (number) => Math.pow(number, 2)

const calculateDistance = ({ a, b }: CalculateDistanceArguments) => {
  const [x1, y1] = a
  const [x2, y2] = b

  return Math.sqrt(pow2(x2 - x1) + pow2(y2 - y1))
}

const handleDragPointMove = (updateState: Function) => (event) => {
  const {
    x, y
  } = event.target.getAttrs()

  updateState([x, y])
}

interface CirclePointProps {
  point: Point,
  updatePoint: Function,
  color?: string
}

const CirclePoint: FunctionComponent<CirclePointProps> = ({ point, updatePoint, color = '#000' }) => (
  <Circle
    radius={10} x={point[0]} y={point[1]} fill={color}
    draggable onDragMove={handleDragPointMove(updatePoint)}
  />
)

const DistanceBetweenPoints = () => {
  const [canvasWidth, canvasHeight] = [500, 300]
  const [a, setPointA] = useState<Point>([125, 100])
  const [b, setPointB] = useState<Point>([360, 180])

  return (
    <>
      <div>
        <p>
          x1, y1 = { a.join(', ') }
        </p>
        <p>
          x2, y2 = { b.join(', ') }
        </p>
        <p>
          distance: { calculateDistance({ a, b }) }
        </p>
      </div>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          <Rect width={canvasWidth} height={canvasHeight} stroke={'#000'} />
        </Layer>
        <Layer>
          <Line points={[...a, ...b]} stroke={'#666'} />
        </Layer>
        <Layer>
          <CirclePoint point={a} updatePoint={setPointA} color={'#507fff'} />
          <CirclePoint point={b} updatePoint={setPointB} color={'#ff2b6a'} />
        </Layer>
      </Stage>
    </>
  )
}

export {
  DistanceBetweenPoints
}
