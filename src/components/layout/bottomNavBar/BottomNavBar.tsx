"use client";

import Link from "next/link";
import * as styles from "./BottomNavBar.css";
import Image from "next/image";
import Home from "/public/images/icons/home.jpg";
import Ai from "/public/images/icons/ai.jpg";
import Store from "/public/images/icons/store.jpg";
import Note from "/public/images/icons/note.jpg";
import HomeActive from "/public/images/icons/home-active.jpg";
import AiActive from "/public/images/icons/ai-active.jpg";
import StoreActive from "/public/images/icons/store-active.jpg";
import NoteActive from "/public/images/icons/note-active.jpg";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();
  return (
    <nav className={styles.bottomNavBarContainer}>
      <section className={styles.bottomNavBarWrapper}>
        <Link href="/" className={styles.navItemWrapper}>
          <Image
            src={pathname === "/" ? HomeActive : Home}
            alt="홈"
            width={31}
            height={31}
          />
          <span className={styles.navText({ active: pathname === "/" })}>
            홈
          </span>
        </Link>
        <Link href="/store" className={styles.navItemWrapper}>
          <Image
            src={pathname === "/store" ? StoreActive : Store}
            alt="스토어"
            width={31}
            height={31}
          />
          <span className={styles.navText({ active: pathname === "/store" })}>
            스토어
          </span>
        </Link>
        <Link href="/survey" className={styles.navItemWrapper}>
          <Image
            src={pathname.startsWith("/survey") ? AiActive : Ai}
            alt="AI 추천"
            width={31}
            height={31}
          />
          <span
            className={styles.navText({
              active: pathname.startsWith("/survey"),
            })}
          >
            AI 추천 식단
          </span>
        </Link>
        <Link href="/note" className={styles.navItemWrapper}>
          <Image
            src={pathname === "/note" ? NoteActive : Note}
            alt="건강 노트"
            width={31}
            height={31}
          />
          <span className={styles.navText({ active: pathname === "/note" })}>
            건강 노트
          </span>
        </Link>
      </section>
    </nav>
  );
}
