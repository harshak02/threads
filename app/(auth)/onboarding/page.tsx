import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const user = await currentUser();
    console.log(user);
    const userInfo = {
        _id : "1234",
        username : "temp",
        name : "tempName",
        bio : "",
        image : "image"
    };

    const userData = {
        id : user?.id || "",
        objectId : userInfo?._id || "",
        username : user?.username || userInfo?.username || "",
        name : user?.firstName || userInfo?.name || "",
        bio : userInfo?.bio || "",
        image : user?.imageUrl || userInfo.image,
        email : user?.emailAddresses[0].emailAddress || ""
    };

    return (
        <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-2">
                Complete your profile now to use Threads
            </p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile user={userData} btnTitle="Continue"/>
            </section>
        </main>
    )
}

export default Page;