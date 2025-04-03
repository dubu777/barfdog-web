'use client';
import React, {useEffect, useState} from 'react';
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as styles from './SideNavBar.css';
import CloseButton from '/public/images/icons/close-black.png';
import SubItemsToggleIcon from '/public/images/icons/accordion-arrow.png';
import KakaoIcon from '/public/images/icons/kakao.svg';
import InstaIcon from '/public/images/icons/insta.svg';
import BlogIcon from '/public/images/icons/blog.svg';
import YoutubeIcon from '/public/images/icons/youtube.svg';
import { commonLayoutStyle } from "@/styles/common.css";
import { useCommonStore } from "@/store/useCommonStore";
import { AnimatePresence, motion } from "framer-motion";

interface SubItem {
  name: string;
  link: string;
}

interface CategoryItem {
  name: string;
  link?: string;
  subItems?: SubItem[];
}

interface Category {
  title: string;
  items: CategoryItem[];
}

const categories: Category[] = [
  {
    title: "헬스케어",
    items: [
      { name: "AI 추천 식단", link: "/survey" },
      {
        name: "건강수첩",
        subItems: [
          { name: "내 반려견 기록", link: "/healthJournal/my-pet-record" },
          { name: "견종백과", link: "/healthJournal/breed-encyclopedia" },
          { name: "건강문진", link: "/healthJournal/health-questionnaire" },
          { name: "장내분석", link: "/healthJournal/gut-analysis" },
        ],
      },
    ],
  },
  {
    title: "제품",
    items: [
      { name: "스토어", link: "/store" },
      { name: "리뷰", link: "/review" },
    ],
  },
  {
    title: "바프독",
    items: [
      { name: "공지사항", link: "/community/notice" },
      { name: "어바웃", link: "/community/about" },
      { name: "블로그", link: "/community/article" },
      { name: "자주 묻는 질문", link: "/community/faq" },
    ],
  },
]
const SideNavBar = () => {
  const router = useRouter();
  const { isOpenSideNavBar, setIsOpenSideNavBar } = useCommonStore();
  const [openSubItems, setOpenSubItems] = useState<boolean>(false);

  useEffect(() => {
    if (isOpenSideNavBar) {
      document.body.style.overflow = 'hidden';
    } else document.body. style.overflow = 'unset';
  }, [isOpenSideNavBar]);


  const backgroundVariants = {
    initial: { opacity: 0 },
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const sideNavBarVariants = {
    initial: { x: '0' },
    open: { x: '100%' },
    closed: { x: '0' },
  };

  const opacity = {
    initial: { opacity: 0 },
    open: { opacity: 1, transition: {duration: 0.35, delay: 0.35}, },
    closed: { opacity: 0, transition: {duration: 0.35} }
  }

  const handleLinkClick = (link: string) => {
    setIsOpenSideNavBar(false);
    router.push(link);
  }

  return (
    <AnimatePresence mode={'wait'}>
      {isOpenSideNavBar &&
        <div className={`${commonLayoutStyle} ${styles.sideNavBarWrapper}`}>
          <motion.div
            variants={backgroundVariants}
            initial='initial'
            animate={isOpenSideNavBar ? 'open' : 'closed'}
            className={styles.background}
            onClick={setIsOpenSideNavBar}
          />
          <motion.div
            variants={sideNavBarVariants}
            animate='enter'
            initial='initial'
            exit='exit'
            className={styles.sideNavBarContainer}
          >
            <motion.div
              variants={opacity}
              initial='initial'
              animate='open'
              exit='closed'
            >
              <button onClick={setIsOpenSideNavBar} className={styles.closeBtn}>
                <Image src={CloseButton} alt='close button' width={10} height={10} />
              </button>
              <motion.div className={styles.navWrapper}>
              {categories.map(category => (
                  <div className={styles.navContainer} key={category.title}>
                    <h2 className={styles.navTitle}>{category.title}</h2>
                    <ul className={styles.navItems}>
                      {category.items.map(item => (
                        <li className={styles.navItem} key={item.name}>
                          {!item.subItems && item.link
                            ? <button onClick={() => handleLinkClick(item.link)} className={styles.navItemLink}>
                              {item.name}
                            </button>
                            : <>
                              <button
                                onClick={() => setOpenSubItems(!openSubItems)}
                                className={styles.subItemsTitle}
                              >
                                {item.name}
                                <span className={styles.arrowIcon({ isOpen: openSubItems })}>
                                  <Image src={SubItemsToggleIcon} alt='arrow icon' />
                                </span>
                              </button>
                              <AnimatePresence>
                                {openSubItems &&
                                  <motion.ul
                                    initial={{height: 0, opacity: 0}}
                                    animate={{height: '84px', opacity: 1}}
                                    className={styles.subItemsContainer}
                                  >
                                    {item.subItems && item.subItems.map(subItem => (
                                      <motion.li
                                        key={subItem.name}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        className={styles.subItem}
                                      >
                                        <Link href={subItem.link}>
                                          {subItem.name}
                                        </Link>
                                      </motion.li>
                                    ))}
                                  </motion.ul>
                                }
                              </AnimatePresence>
                            </>
                          }
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
              <div className={styles.snsContainer}>
                <Link href='https://pf.kakao.com/_WixbrK'><KakaoIcon /></Link>
                <Link href='https://www.instagram.com/barfdog_official/'><InstaIcon /></Link>
                <Link href='https://blog.naver.com/barfdog'><BlogIcon /></Link>
                <Link href='https://blog.naver.com/barfdog'><YoutubeIcon /></Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      }
    </AnimatePresence>
  );
};

export default SideNavBar;