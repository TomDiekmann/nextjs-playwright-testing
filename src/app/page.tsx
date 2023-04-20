"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-xl gap-4">
      Startseite
    </div>
  );
};

export default Page;
