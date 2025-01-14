import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { signin } from "@/services/authService";

// Define las opciones de NextAuth
const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Verifica que las credenciales existan
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error("Both email and password are required");
          }

          const res = await signin(credentials);

          const { user } = res.data;

          if (user) {
            return user; // Retorna el usuario autenticado
          } else {
            throw new Error("Credenciales inválidas");
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 401) {
            throw new Error("Credenciales inválidas");
          }
          console.error("Error in authorize:", error);
          throw new Error("Credenciales inválidas");
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Página personalizada de inicio de sesión
  },
  session: {
    strategy: "jwt", // Usamos JWT para manejar la sesión
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Solo añade propiedades al token si hay un usuario autenticado
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.companyId = user.companyId;
      }

      return token;
    },
    async session({ session, token }) {
      // Si existe el token, añade sus valores a la sesión
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          companyId: token.companyId,
        };
      }

      return session;
    },
  },
  secret: process.env.JWT_SECRET, // Secreto para firmar el JWT
};

// Exporta las funciones GET y POST para que Next.js las reconozca
const handler = NextAuth(options);

export { handler as GET, handler as POST };
