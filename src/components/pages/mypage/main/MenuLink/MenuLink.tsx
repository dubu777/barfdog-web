import * as styles from "./MenuLink.css";
import Link from "next/link";
import Image from "next/image";

interface MyPageMenuType {
  name: string;
  url: string;
}

const menuLink: MyPageMenuType[] = [
  {
    url: '/orderHistory',
    name: '주문내역',
  },
  {
    url: '/coupon',
    name: '쿠폰함',
  },
  {
    url: '/reward',
    name: '적립금',
  },
  {
    url: '/manageCard',
    name: '카드 관리',
  },
  {
    url: '/inviteFriends',
    name: '친구 초대',
  },
  {
    url: '/review',
    name: '리뷰',
  },
];


const MyPageMenu = () => {
  return (
    <article>
      <ul className={styles.menuContainer}>
        {menuLink.map(menu => (
          <li
            key={menu.url}
            className={styles.menuItem}
          >
            <Link href={`/mypage/${menu.url}`}>
              <Image
                src={`/images/myPage${menu.url}.png`}
                alt={menu.name}
                width={51}
                height={51}
                className={styles.menuIcon}
              />
              <p>{menu.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.bottomMenuWrapper}>
        <div className={styles.bottomMenuContainer}>
          <Link href='/all'>전 성분 보기</Link>
          <div className={styles.bottomMenuRight}>
            <Link href='/mypage/account'>계정 정보</Link>
            <button>로그 아웃</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyPageMenu;