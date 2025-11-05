import { LoginForm } from "@/components/login-form";
import AppLayout from "@/layout/AppLayout";
import React from "react";

const LoginPage = () => {
  return (
    <AppLayout>
      <div className="min-h-screen w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </AppLayout>
  );
};

export default LoginPage;
