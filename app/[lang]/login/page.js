import Login from "@/components/auth/Login";
import { getDictionary } from "@/app/[lang]/dictionaries";

export const metadata = {
    title: "Login"
}

export default async function LoginPage({ params: { lang } }) {
    const dictionary = await getDictionary(lang);
    return (
        <>
            <Login dictionary={dictionary} />
        </>
    );
}