import {useEffect} from 'react'
import Kova from 'konva'
import {Point} from '../types'
import {pow2} from '../lib'

const rightTriangleSides = (A: Point, B: Point): {a: number, b: number, c: number} => {
  const a = B.x - A.x
  const b = B.y - A.y
  const c = Math.sqrt(pow2(a) + pow2(b))

  return {a, b, c}
}

export const useMoveToDirection = (rotationFunction?: Function) => (targetPoint: Point, movingRef) => {
  useEffect(() => {
    const animation = new Kova.Animation(() => {
      const x = movingRef.current.x()
      const y = movingRef.current.y()

      const {a, b, c} = rightTriangleSides({x, y}, targetPoint)

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
