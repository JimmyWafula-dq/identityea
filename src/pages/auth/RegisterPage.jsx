import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import AppLayout from "@/layout/AppLayout";
import React from "react";

const RegisterPage = () => {
  return (
    <AppLayout>
      <div className="min-h-screen w-full flex items-center justify-center">
        <RegisterForm />
      </div>
    </AppLayout>
  );
};

export default RegisterPage;
