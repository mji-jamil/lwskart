import UpdateProfile from "@/components/profile/UpdateProfile";
import { auth } from "@/auth";
import { getUserData } from "@/database/queries";
export const metadata = {
    title: "Update Profile"
}

export default async function ProfilePage() {
    const session = await auth();
    const userData = await getUserData(session?.user?.email);

    return (
        <>
            <UpdateProfile user={userData} />
        </>
    );
}