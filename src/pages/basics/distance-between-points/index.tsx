import React, {useState, FunctionComponent} from 'react'
import {Layer, Line, Circle} from 'react-konva'
import {Point, TwoPoints} from '../../../types'
import {BaseCanvas} from '../../../components/canvas'
import {pow2} from '../../../lib'

const distance = ({a, b}: TwoPoints) => Math.sqrt(pow2(b.x - a.x) + pow2(b.y - a.y))

const handleDragPoint = (setState: Function) => (event) => {
  const {
    x, y
  } = event.target.getAttrs()

  setState({x, y})
}

interface CirclePointProps {
  point: Point,
  updatePoint: Function,
  color?: string
}

const CirclePoint: FunctionComponent<CirclePointProps> = ({point, updatePoint, color = '#000'}) => (
  <Circle
    radius={10} x={point.x} y={point.y} fill={color}
    draggable onDragMove={handleDragPoint(updatePoint)}
  />
)

const DistanceBetweenPoints = () => {
  const [a, setPointA] = useState<Point>({x: 140, y: 140})
  const [b, setPointB] = useState<Point>({x: 380, y: 300})

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
          a = x2 - x1 = {a.x} - {b.x}
        </p>
        <p>
          b = y2 - y1 = {a.y} - {b.y}
        </p>
        <p>
          distance = c = Math.sqrt(a * a + b * b) = {distance({a, b}).toFixed(2)}
        </p>
      </div>
      <p>
        Drag a point to change the distance
      </p>
      <BaseCanvas>
        <Layer>
          <Line points={[a.x, a.y, b.x, b.y]} stroke={'#666'}/>
          <Line points={[a.x, a.y, a.x, b.y]} stroke={'#666'}/>
          <Line points={[b.x, b.y, a.x, b.y]} stroke={'#666'}/>
        </Layer>
        <Layer>
          <CirclePoint point={a} updatePoint={setPointA} color={'#507fff'}/>
          <CirclePoint point={b} updatePoint={setPointB} color={'#ff2b6a'}/>
        </Layer>
      </BaseCanvas>
    </>
  )
}

export {
  DistanceBetweenPoints
}
