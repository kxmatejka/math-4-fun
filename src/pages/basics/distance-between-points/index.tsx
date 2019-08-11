import React, { useState, FunctionComponent } from 'react'
import { Layer, Line, Circle } from 'react-konva'
import { Point } from '../../../types'
import { BaseCanvas } from '../../../components/canvas'

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

const handleDragPoint = (updateState: Function) => (event) => {
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
    draggable onDragMove={handleDragPoint(updatePoint)}
  />
)

const DistanceBetweenPoints = () => {
  const [a, setPointA] = useState<Point>([140, 140])
  const [b, setPointB] = useState<Point>([380, 300])

  return (
    <>
      <div>
        <p>
          <a href={'https://en.wikipedia.org/wiki/Pythagorean_theorem'} target={'_blank'}>Pythagorean theorem</a>
        </p>
        <p>
          c * c = a * a + b * b
        </p>
        <p>
          a = x2 - x1 = { a[0] } - { b[0] }
        </p>
        <p>
          b = y2 - y1 = { a[1] } - { b[1] }
        </p>
        <p>
          distance = c = Math.sqrt(a * a + b * b) = { calculateDistance({ a, b }).toFixed(2) }
        </p>
      </div>
      <BaseCanvas>
        <Layer>
          <Line points={[...a, ...b]} stroke={'#666'} />
          <Line points={[a[0], a[1], a[0], b[1]]} stroke={'#666'} />
          <Line points={[b[0], b[1], a[0], b[1]]} stroke={'#666'} />
        </Layer>
        <Layer>
          <CirclePoint point={a} updatePoint={setPointA} color={'#507fff'} />
          <CirclePoint point={b} updatePoint={setPointB} color={'#ff2b6a'} />
        </Layer>
      </BaseCanvas>
    </>
  )
}

export {
  DistanceBetweenPoints
}
