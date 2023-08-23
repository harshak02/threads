"use server";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string;
    username: String;
    name: string;
    bio: string;
    image: string;
    path: string;
    email : string;
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
    email
}: Params): Promise<void> {
    connectToDB();

    try {

        const userShow = await User.findOneAndUpdate(
            {
                id : userId,
            },
            {
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
                email
            },
            { upsert: true }
        );

        //for debugging
        console.log(userShow);

        //related to cache
        if (path === '/profile/edit') {
            revalidatePath(path);
        }

    } catch (error: any) {
        throw new Error(`Failed to create or update the Profile ${error.message}`);
    }
}


export async function fetchUser(userId : string){
    try {
        connectToDB();
        console.log("connected to DB")
        return await User
        .findOne({id : userId})
        // .populate({
        //     path : 'communities',
        //     model : Community
        // })
    } catch (error : any) {
        throw new Error(`Failed to fetch user : ${error.message}`);
    }
}