"use client";
import { commonWrapper } from "@/styles/common.css";
import Link from "next/link";
import Accordion from "@/components/ui/accordion/Accordion";
import Text from "@/components/ui/text/Text";
import InfoText from "@/components/ui/typography/infoText/InfoText";
import Divider from "@/components/ui/divider/Divider";
import Header from "@/components/layout/header/Header";
import { FAQ_LIST } from "@/constants/community";

export default function Faq() {
  return (
    <>
      <Header showBackButton centerTitle="자주 묻는 질문" />
      <section
        className={commonWrapper({
          direction: "col",
          align: "start",
          justify: "start",
          minHeight: "fullWithHeader",
          paddingBottom: 40,
        })}
      >
        <Divider height={1} color="gray50" />
        <article
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 4,
            backgroundColors: "gray0",
            padding: 20,
            paddingTop: 40,
          })}
        >
          <Text type="title4">
            보호자님들께서
            <br />
            자주 하시는 질문을 모아봤어요!
          </Text>
          <Text type="body2" color="gray600">
            이곳에 궁금하신 질문이 없다면 우측 하단의 상담 아이콘을 통해 실시간
            상담 받아보세요!
          </Text>
        </article>
        <article
          className={commonWrapper({
            backgroundColors: "gray0",
            direction: "col",
            align: "start",
          })}
        >
          {FAQ_LIST.map((faq, index) => (
            <Accordion
              key={`${faq.label}${index}-${faq.question}`}
              contentClassName={commonWrapper({ backgroundColors: "gray50" })}
              title={
                <div
                  className={commonWrapper({
                    justify: "start",
                    align: "center",
                    gap: 20,
                  })}
                >
                  <Text type="label4" style={{ minWidth: "15%" }} block>
                    {faq.label}
                  </Text>
                  <Text type="label3">{faq.question}</Text>
                </div>
              }
            >
              <div
                className={commonWrapper({
                  direction: "col",
                  align: "start",
                  gap: 24,
                })}
              >
                <Text type="body3" color="gray700" preLine>
                  {faq.answer}
                </Text>
                {faq?.subDescription && (
                  <div>
                    {faq.subDescription.map((subDescription, index) => (
                      <InfoText
                        key={`${faq.label}${index}-${subDescription}`}
                        text={subDescription}
                      />
                    ))}
                  </div>
                )}
                {faq?.url && faq?.linkLabel && (
                  <Link href={faq.url} target="_blank">
                    <Text type="body3" color="gray700" underLine>
                      {faq.linkLabel}→
                    </Text>
                  </Link>
                )}
              </div>
            </Accordion>
          ))}
          <Divider height={1} color="gray200" />
        </article>
      </section>
    </>
  );
}
