import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import mongoClientPromise from "@/database/mongoClientPromise";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { userModel } from "@/models/user-model";
import bcrypt from "bcryptjs";

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    adapter: MongoDBAdapter(mongoClientPromise),
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (credentials == null) return null;

                try {
                    const user = await userModel.findOne({
                        email: credentials.email,
                    });

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password,
                        );
                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or password mismatch");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
    ],
});