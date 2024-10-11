import * as styles from '@/components/main/main.css';
import MainSection1 from "@/components/main/MainSection1";
import MainSection2 from "@/components/main/MainSection2";
import MainSection3 from "@/components/main/MainSection3";
import MainSection4 from "@/components/main/MainSection4";
import MainSection5 from "@/components/main/MainSection5";
import MainSection6 from "@/components/main/MainSection6";

export default function MainPage() {
  return (
    <section className={styles.mainContainer}>
      <MainSection1 />
      <MainSection2 />
      <MainSection3 />
      <MainSection4 />
      <MainSection5 />
      <MainSection6 />
    </section>
  )
}
