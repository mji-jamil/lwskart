import { auth } from "@/auth";
import { getUserData } from "@/database/queries";
import UpdateShipping from "@/components/profile/UpdateShipping";

export default async function ShippingAddressPage() {
    const session = await auth();
    const userData = await getUserData(session?.user?.email);

    return (
        <>
            <UpdateShipping user={userData} />
        </>
    );
}