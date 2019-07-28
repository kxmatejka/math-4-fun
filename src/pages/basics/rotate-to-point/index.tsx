import React, { useState, useEffect } from 'react'
import {Stage, Layer, Image, Rect} from 'react-konva'
import { Point } from '../../../types'

const CAR_URL = '/static/images/car-2d.png'

const useImage = (url: string) => {
  const [image, setImage] = useState()

  useEffect(() => {
    const imgElement = document.createElement('img')

    const onLoad = () => {
      setImage(imgElement)
    }

    imgElement.addEventListener('load', onLoad)
    imgElement.src = url

    return () => {
      imgElement.removeEventListener('load', onLoad)
    }
  }, [url])

  return image
}

interface AngleToPointArguments {
  a: Point,
  b: Point
}

const radianToDegree = (radian) => radian * 180 / Math.PI

const angleToPoint = ({ a, b }: AngleToPointArguments) => {
  const x = a[0] - b[0]
  const y = a[1] - b[1]

  let angle = Math.atan2(y, x)
  angle += Math.PI / 2 // fix for pointed up image
  angle = radianToDegree(angle)

  if (angle < 0) { // fix of atan2 +180/-180 range
    angle = 360 - (-angle)
  }

  return angle
}

const RotateToPoint = () => {
  const [canvasWidth, canvasHeight] = [500, 500]
  const [cursorPosition, setCursorPosition] = useState<Point>([250, 0])
  const image = useImage(CAR_URL)
  const angle = angleToPoint({ a: cursorPosition, b: [250, 250] })

  return (
    <>
      <p>
        cursor x, y = { cursorPosition.join(', ') }
      </p>
      <p>
        rotation = { Math.floor(angle) }°
      </p>
      <Stage width={canvasWidth} height={canvasHeight} onMouseMove={(event) => {
        const stage = event.target.getStage()
        const {
          x, y
        } = stage.getPointerPosition()
        setCursorPosition([x, y])
      }}>
        <Layer>
          <Rect width={canvasWidth} height={canvasHeight} stroke={'#000'} />
        </Layer>
        <Layer>
          <Image image={image}
                 x={250} y={250}
                 width={128} height={128}
                 offsetX={64} offsetY={64}
                 rotation={angle}
                 stroke={'#ddd'} strokeWidth={1}
          />
        </Layer>
      </Stage>
    </>
  )
}

export {
  RotateToPoint
}
