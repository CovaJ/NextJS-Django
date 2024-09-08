"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import styles from "../src/styles/Home.module.css";
import dateformat from "dateformat";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/campaigns");
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const data = await response.json();
        if (!data.length) {
          notFound();
        }
        setCampaigns(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      }
    }

    fetchCampaigns();
  }, []);

  const handleNavigation = (slug) => {
    router.push("/" + slug);
  };

  return (
    <>
      <div>
        <Head>
          <title>Campaign Manager: Home</title>
          <meta name="description" content="An application to manage campaigns" />
        </Head>
        <main className={styles.main}>
          <div className={styles.innerContent}>
            <h1>Available campaigns</h1>

            {error && <p>{error}</p>}
            {campaigns.map((e) => (
              <div className={styles.item} onClick={() => handleNavigation(e.slug)} key={e.slug}>
                <div className={styles.imgContainer}>
                  <Image
                    className={styles.img}
                    src={"https://res.cloudinary.com/dwgostzfh/" + e.logo}
                    height={120}
                    width={120}
                    alt="Campaign Banner"
                  />
                </div>

                <div className={styles.rightItems}>
                  <Link href={"/" + e.slug}>{e.title}</Link>
                  <p>{e.description}</p>
                  <small>{dateformat(new Date(e.created_at), "dddd, mmmm, dS, yyyy, h:MM:ss TT")}</small>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
