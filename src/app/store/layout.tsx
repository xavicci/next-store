import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <nav>Navigate on Categories</nav>
      {children}
    </main>
  );
}
