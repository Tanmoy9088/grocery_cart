"use client";
import { Footer } from "@/layouts/(user)/Footer";
import Header from "@/layouts/(user)/Header";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
