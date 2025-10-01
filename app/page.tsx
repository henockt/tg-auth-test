"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState, CSSProperties } from "react";
import { initData, retrieveRawInitData } from '@telegram-apps/sdk';

const attr: CSSProperties = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center"
};

export default function Home() {  
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initDataRaw = retrieveRawInitData();
      
        const res = await fetch("/api", {
          method: 'POST',
          headers: {
            Authorization: `tma ${initDataRaw}`
          },
        });

        if (res.ok) {
          setUserData(await res.json());
        }
      } catch(e) {
        console.log(e);
      }
    };

    if (initData) {
      fetchData();
    }
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        { !userData ? null : 
          <Image
            src={userData.photoUrl}
            alt="User photo"
            width={180}
            height={180}
            // priority
          />
        }

        { !userData
          ? 
            <>
              <h2 style={attr}>Not logged in.</h2>
              <p>Make sure this mini app is opened in Telegram.</p>
            </>
          :
            <>
              <h2 style={attr}>Logged in as {userData.name}.</h2>
              <p>@{userData.username}</p>
              <p>{userData.id}</p>
            </>
        }

        <div style={attr} className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://github.com/henockt/tg-auth-test"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/icons8-github.svg"
              alt="Github logo"
              width={20}
              height={20}
            />
            Check on GitHub
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        tg-auth-test
      </footer>
    </div>
  );
}
