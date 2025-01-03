import { db } from "../db"

export const OtherProfile = async (profileId: string) => {
   try {
     const otherProfile = await db.profile.findFirst({
        where: {
            id: profileId
        }
     })

     return otherProfile;
   } catch (error) {
     console.log(error)
   }
}