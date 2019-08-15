import {Point} from '../types'

export const pow2 = (number) => Math.pow(number, 2)

export const radianToDegree = (radian) => radian * 180 / Math.PI

export const angleToPoint = (a: Point, b: Point) => {
  const x = a.x - b.x
  const y = a.y - b.y

  let angle = Math.atan2(y, x)
  angle += Math.PI / 2 // fix for pointed up image
  angle = radianToDegree(angle)

  if (angle < 0) { // fix of atan2 +180/-180 range
    angle = 360 - (-angle)
  }

  return angle
}
