import {useEffect} from 'react'
import Kova from 'konva'
import {Point} from '../types'
import {pow2} from '../lib'

export const useMoveToDirection = (rotationFunction?: Function) => (targetPoint: Point, movingRef) => {
  useEffect(() => {
    const animation = new Kova.Animation(() => {
      const x = movingRef.current.x()
      const y = movingRef.current.y()

      const a = targetPoint.x - x
      const b = targetPoint.y - y
      const c = Math.sqrt(pow2(a) + pow2(b))

      const velocityX = a / c
      const velocityY = b / c

      if (c > 1) {
        movingRef.current.x(x + velocityX)
        movingRef.current.y(y + velocityY)

        if (typeof rotationFunction === 'function') {
          rotationFunction(movingRef, targetPoint)
        }
      }
    }, movingRef.current.getLayer())

    animation.start()

    return () => animation.stop()
  }, [targetPoint])
}
