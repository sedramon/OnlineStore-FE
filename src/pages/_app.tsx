import MainLayout from "@/components/layouts/main-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserContext from "@/UserContext";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [userContext, setUserContext] = useState({
    id: "",
    username: "",
    email : ""
  });

  return (
    <UserContext.Provider value={{userContext, setUserContext}}>
      <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
    </UserContext.Provider>
  );
}
