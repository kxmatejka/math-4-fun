import React, { createContext, FunctionComponent } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'

interface BaseCanvasProps {
  onMouseMove?: (e: KonvaEventObject<MouseEvent>) => void
}

const [canvasWidth, canvasHeight] = [500, 500]
const BaseCanvasSizeContext = createContext([canvasWidth, canvasHeight])

const BaseCanvas: FunctionComponent<BaseCanvasProps> = ({ onMouseMove, children }) => (
  <BaseCanvasSizeContext.Provider value={[canvasWidth, canvasHeight]}>
    <Stage width={canvasWidth} height={canvasHeight} onMouseMove={onMouseMove}>
      <Layer>
        <Rect width={canvasWidth} height={canvasHeight} stroke={'#000'} />
      </Layer>
      { children }
    </Stage>
  </BaseCanvasSizeContext.Provider>
)

export {
  BaseCanvas,
  BaseCanvasSizeContext
}
