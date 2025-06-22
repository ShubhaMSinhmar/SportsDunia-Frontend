import "../styles/globals.css";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const root = window.document.documentElement;
    const theme = localStorage.getItem("theme") || "light";
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
