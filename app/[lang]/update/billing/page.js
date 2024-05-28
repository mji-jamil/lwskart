import { auth } from "@/auth";
import { getUserData } from "@/database/queries";
import UpdateBilling from "@/components/profile/UpdateBilling";

export const metadata = {
    title: "Update Billing"
}

export default async function BillingPage() {
    const session = await auth();
    const userData = await getUserData(session?.user?.email);

    return (
        <>
            <UpdateBilling user={userData} />
        </>
    );
}