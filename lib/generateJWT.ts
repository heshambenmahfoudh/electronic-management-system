import jwt from 'jsonwebtoken'

export async function generateAccessToken(data: string) {
  return await jwt.sign(data, process.env.ACCESS_TOKEN as string)
}
export async function generateRefrechToken(data: string) {
  return await jwt.sign(data, process.env.REFRECH_TOKEN as string)
}
