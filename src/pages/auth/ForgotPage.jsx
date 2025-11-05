import { ForgotForm } from "@/components/forgot-form";
import { LoginForm } from "@/components/login-form";
import AppLayout from "@/layout/AppLayout";
import React from "react";

const ForgotPage = () => {
  return (
    <AppLayout>
      <div className="min-h-screen w-full flex items-center justify-center">
        <ForgotForm />
      </div>
    </AppLayout>
  );
};

export default ForgotPage;
