import React, {useState, useEffect, useContext} from 'react'
import {Layer, Image} from 'react-konva'
import {Point} from '../../../types'
import {BaseCanvas, BaseCanvasSizeContext} from '../../../components/canvas'
import {angleToPoint} from '../../../lib'

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

const handleMouseMove = (setState: Function) => (event) => {
  const {
    x, y
  } = event.target.getStage().getPointerPosition()

  setState({x, y})
}

const RotateToPoint = () => {
  const [canvasWidth, canvasHeight] = useContext(BaseCanvasSizeContext)
  const [halfCanvasWidth, halfCanvasHeight] = [canvasWidth / 2, canvasHeight / 2]
  const [cursorPosition, setCursorPosition] = useState<Point>({x: halfCanvasWidth, y: 0})
  const image = useImage(CAR_URL)
  const angle = angleToPoint(cursorPosition, {x: halfCanvasWidth, y: halfCanvasHeight})

  return (
    <>
      <p>
        cursor x, y = {cursorPosition.x} , {cursorPosition.y}
      </p>
      <p>
        angle = {Math.floor(angle)}°
      </p>
      <BaseCanvas onMouseMove={handleMouseMove(setCursorPosition)}>
        <Layer>
          <Image image={image}
                 x={halfCanvasWidth} y={halfCanvasHeight}
                 width={128} height={128}
                 offsetX={64} offsetY={64}
                 rotation={angle}
                 stroke={'#ddd'} strokeWidth={1}
          />
        </Layer>
      </BaseCanvas>
    </>
  )
}

export {
  RotateToPoint
}
