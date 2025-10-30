import RegisterForm from "@/components/auth/RegisterForm";

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
      <RegisterForm />
    </>
  );
}
