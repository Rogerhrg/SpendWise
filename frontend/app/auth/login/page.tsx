import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "SpendWise - Iniciar Sesión",
  description: "Comienza a administrar tus finanzas",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Iniciar Sesión</h1>
      <p className="text-3xl font-bold">
        y controla tus <span className="text-amber-500">finanzas</span>
      </p>
      <RegisterForm />
    </>
  );
}
