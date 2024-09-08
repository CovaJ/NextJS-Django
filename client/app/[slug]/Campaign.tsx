"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from "../../src/styles/Details.module.css";
import Link from 'next/link';
import dateformat from "dateformat";
import { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa"

export function Campaign({ data }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const options = {
      method: "POST",
      body: JSON.stringify({
        email,
        campaign: data.id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(process.env.NEXT_PUBLIC_BASE_URL + "/subscribers", options)
    .then((res) => res.json())
    .then((response) => {
        setSubmitted(true);
      })
    .catch((error) => console.log(error))
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.main}>

        </div>
        <div className={styles.contents}>
          <Image
            className={styles.img}
            src={"https://res.cloudinary.com/dwgostzfh/" + data.logo}
            height={120}
            width={120}
            alt="Campaign Banner"
          />

          <div className={styles.grid}>
            <div className={styles.left}>
              <h1 className={styles.title}>{data.title}</h1>
              <p className={styles.description}>{data.description}</p>
            </div>

            <div className={styles.right}>
                {!submitted ? <div className={styles.rightContents}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <input required onChange={(event) => {
                              setEmail(event.target.value)
                            }} type='email' name='email' placeholder='Enter an Email' className={styles.input}/>
                        </div>

                        <div className={styles.submit}>
                            <input type='submit' value={loading ? "Please Wait" : "SUBSCRIBE"} disabled={loading} className={styles.button}/>

                            <p className={styles.consent}>We respect your privacy. Unsubscribe anytime</p>
                        </div>
                    </form>
                </div> : <div className={styles.thanks}>
                  <div className={styles.icon}>
                    <FaCheckCircle size={17} color="green"/>
                  </div>
                  <div className={styles.message}>
                    Thank you for your subscription
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.item} key={data.slug}>
        <div className={styles.rightItems}>
          
          <small>{dateformat(new Date(data.created_at), "dddd, mmmm, dS, yyyy, h:MM:ss TT")}</small>
        </div>

        <footer className={styles.footer}>
            <Link href="/">Go back to list</Link>
        </footer>
      </div>
    </div>
  );
}