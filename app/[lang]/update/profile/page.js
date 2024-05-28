import UpdateProfile from "@/components/profile/UpdateProfile";
import { auth } from "@/auth";
import { getUserData } from "@/database/queries";

export default async function Page() {
    const session = await auth();
    const userData = await getUserData(session?.user?.email);

    return (
        <>
            <UpdateProfile user={userData} />
        </>
    );
}