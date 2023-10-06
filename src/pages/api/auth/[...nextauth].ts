import { signIn, signInWithGoogle } from "@/lib/firebase/services";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CreadentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET, //ini berupa string acak kita bisa dicari google, kita simpan didalam file .env
    providers: [CreadentialsProvider({
       type: "credentials",
        name:  "Credentials",
        credentials: {
            email: {label: "Email", type: "email"},
            pasword: {label: "Password", type: "password"},
        },
        async authorize(credentials : any)  {
            const {email, password,} = credentials as {
                email: string;
                password: string;
               
            };
          const user : any = await signIn({email});
            if (user) {  
                const passwordConfirmed = await compare(password, user.password);
                if (passwordConfirmed) {
                    return user;
                }  
                return null;
            } else {
                return null;
            }
        }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
      })

],

callbacks: {
    async jwt ({token, account , profile, user} : any) {
        if(account?.provider === "credentials") {
            token.email = user.email;
            token.fullName = user.fullName;
            token.role = user.role;
        }
        if (account?.provider === "google") {
            const data = {
                fullName: user.name,
                email: user.email,
                image: user.image,
                type : "google",
                
            }

            await signInWithGoogle(
                data,
                (result: {status: boolean; message: string; data: any}) => {
                if(result.status) {
                    token.email = result.data.email;
                    token.fullName = result.data.fullName;
                    token.type = result.data.type;
                    token.image = result.data.image;
                    token.role = result.data.role;
                    
                }
            });            
        }
        return token;
    },
    async session ({session, token} : any) {
        if ("email" in token) {
            session.user.email = token.email;
        }
        if ("fullName" in token) {
            session.user.fullName = token.fullName;
        }
        if ("image" in token) {
            session.user.image = token.image;
        }
        if ("role" in token) {
            session.user.role = token.role;
        }
        return session;
    }
  },
  pages: {
      signIn: "/auth/login"
  }
}

export default NextAuth(authOptions)