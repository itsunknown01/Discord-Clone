import { db } from "../db"

export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await db.passwordToken.findFirst({
        where: {
            email
        }
    })

    return passwordToken
  } catch (error) {
    return null
  }
}

export const getPasswordTokenByToken = async (token: string) => {
  try {
    const passwordToken = await db.passwordToken.findUnique({
        where: {
            token
        }
    })

    return passwordToken
  } catch (error) {
    return null
  }
}