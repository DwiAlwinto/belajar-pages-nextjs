import { useSession } from "next-auth/react"

const ProfilePage = () => {
    const { data } : any = useSession();
    return (
       <div>
        <div>Profile</div>
        <h2>{data && data.user.fullName}</h2>
       </div>
    )
} 

export default ProfilePage