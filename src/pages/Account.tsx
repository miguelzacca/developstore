import { useRef } from "react";

import "../styles/pages/Account.scss";
import config from "../config";

export function Account() {
  localStorage.clear();

  const mainTag = useRef<HTMLElement>(null);

  fetch(`${config.API_URL}/api/user`, {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        return (location.href = "/login");
      }

      if (mainTag.current) {
        mainTag.current.textContent = "SUCCESS";
      }
    })
    .catch((err) => {
      console.error(err);
      location.href = "/login"
    });

  return (
    <>
      <main id="Account" ref={mainTag}></main>
    </>
  );
}
