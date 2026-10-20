import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      type: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const url = isSignUp ? "user/sign-up" : "user/sign-in";

        const { email, password, name, isSignUp } = credentials;
        // console.log("credentials : ", credentials, !!isSignUp);

        const url = JSON.parse(isSignUp) ? "user/sign-up" : "user/sign-in";
        const dataToSend = { email, password };
        if (isSignUp) dataToSend.name = name;

        const NODE_BASE_URL = "http://localhost:5500";
        const res = await fetch(`${NODE_BASE_URL}/${url}`, {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log("user response : ", data);
        // If no error and we have data data, return it
        if (res.ok && data) {
          return data;
        }

        if (!res.ok) {
          throw new Error(data.message || data.errors);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 40,
  },
  // jwt: {
  //   // Defaults to `session.maxAge`.
  //   // maxAge: 40,
  // },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (user) {
        token.backendAccessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.backendAccessToken = token.backendAccessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
