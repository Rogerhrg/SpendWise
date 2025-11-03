import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Link from "next/dist/client/link";

export const metadata = {
  title: "SpendWise - Olvidé mi Contraseña",
  description: "Cambia tu contraseña olvidada",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Olvidé mi Contraseña</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>
      <ForgotPasswordForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link href='/auth/login' className="text-center text-gray-500">¿Ya tienes una cuenta? Inicia sesión</Link>
        <Link href='/auth/register' className="text-center text-gray-500">¿No tienes una cuenta? Crea una cuenta</Link>
      </nav>
    </>
  );
}
