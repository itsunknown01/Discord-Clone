import { db } from "@/services/db"

export const getUserById = async (id: string | undefined) => {
   try {
    const user = await db.user.findUnique({
        where: {
          id,
        }
    })

    return user
   } catch (error) {
    console.log(error)
    return null
   }
}
export const getUserByEmail = async (email: string | undefined) => {
   try {
    const user = await db.user.findUnique({
        where: {
          email,
        }
    })

    return user
   } catch (error) {
    console.log(error)
    return null
   }
}