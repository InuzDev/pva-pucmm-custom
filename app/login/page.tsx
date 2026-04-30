import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { GraduationCap } from "lucide-react";

export default function LoginPage() {
   return (
      <main className="bg-background relative flex min-h-screen flex-col">
         {/* subtle decorative grid */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.4]"
            style={{
               backgroundImage:
                  "radial-gradient(circle at 1px 1px, oklch(0.91 0.005 90) 1px, transparent 0)",
               backgroundSize: "24px 24px",
               maskImage:
                  "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
         />

         <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
            <Link href="/" className="flex items-center gap-2">
               <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
                  <GraduationCap className="size-4" />
               </div>
               <span className="text-foreground text-sm font-semibold tracking-tight">
                  Aula PUCMM
               </span>
            </Link>
            <Link
               href="#"
               className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
               ¿Necesitas ayuda?
            </Link>
         </header>

         <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
            <div className="w-full max-w-sm">
               <div className="mb-8 flex flex-col gap-2 text-center">
                  <h1 className="text-foreground font-serif text-4xl leading-tight tracking-tight text-balance md:text-5xl">
                     Bienvenido de vuelta
                  </h1>
                  <p className="text-muted-foreground text-sm text-pretty">
                     Ingresa con tu cuenta institucional para continuar tu
                     aprendizaje.
                  </p>
               </div>

               <LoginForm />

               <p className="text-muted-foreground mt-8 text-center text-xs text-balance">
                  Al continuar, aceptas las{" "}
                  <Link
                     href="#"
                     className="text-foreground underline-offset-4 hover:underline"
                  >
                     políticas de uso
                  </Link>{" "}
                  de la plataforma.
               </p>
            </div>
         </div>

         <footer className="relative z-10 px-6 py-6 md:px-10">
            <p className="text-muted-foreground text-center text-xs">
               Pontificia Universidad Católica Madre y Maestra · Plataforma
               Virtual de Aprendizaje
            </p>
         </footer>
      </main>
   );
}
