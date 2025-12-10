import { commonWrapper, imageWrapper, pointColor } from "@/styles/common.css";
import Image from "next/image";
import { format } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import WeightIcon from "/public/images/healthNote/aiObesityCheck/weight-sm.svg";
import Text from "@/components/ui/text/Text";
import Card from "@/components/ui/card/Card";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Divider from "@/components/ui/divider/Divider";
import ResultTitle from "../../../common/resultTitle/ResultTitle";
import { ObesityDetailResponse } from "@/types/healthNote/aiObesityCheck";

interface DefaultInfoProps {
  data: ObesityDetailResponse;
}

export default function DefaultInfo({ data }: DefaultInfoProps) {
  const obesityLabelMatch = data.status?.match(/\(([^)]+)\)/);
  const obesityLabel = obesityLabelMatch ? obesityLabelMatch[1] : "";

  const imageList = [data?.fileUrl, data?.oriFileUrl].map((file, index) => ({
    url: file,
    filename: index === 0 ? "fileUrl" : "oriFileUrl",
  }));

  return (
    <div
      className={commonWrapper({
        direction: "col",
        gap: 16,
        padding: 20,
        paddingBottom: 40,
      })}
    >
      <div className={commonWrapper({ direction: "col", gap: 8 })}>
        <ResultTitle
          title={`${format(
            new Date(data.regDate),
            "yyyy-MM-dd"
          )} 비만 AI 진단 결과`}
        />
        <Text type="title2">AI 비만도 분석 결과 리포트</Text>
      </div>
      <Card
        shadow="strong"
        direction="col"
        gap={12}
        borderRadius={16}
        className={commonWrapper({
          direction: "col",
          paddingY: 24,
          paddingX: 20,
        })}
      >
        <Text
          type="headline3"
          align="center"
          className={commonWrapper({ gap: 8 })}
        >
          <SvgIcon src={WeightIcon} size={32} />
          <span>
            {data.score}점으로{" "}
            <span className={pointColor}>{data?.status}</span> 결과를 받았어요
          </span>
        </Text>
        <Card
          shadow="none"
          backgroundColor="gray100"
          borderRadius={12}
          padding={16}
        >
          <div
            className={commonWrapper({
              gap: 12,
              paddingX: 12,
            })}
          >
            <div className={commonWrapper({ width: "auto", direction: "col" })}>
              <Text type="headline2" color="red" align="center">
                BCS {data.bcs}단계
              </Text>
              <Text type="title2" color="red" align="center">
                {obesityLabel}
              </Text>
            </div>
            <Divider
              direction="vertical"
              height={1}
              color="gray300"
              style={{ height: "50px" }}
            />
            <Text type="body3" style={{ maxWidth: "55%" }}>
              {data.description}
            </Text>
          </div>
        </Card>
        <Swiper slidesPerView="auto" pagination modules={[Pagination]}>
          {imageList?.map((image) => (
            <SwiperSlide
              key={image.filename}
              className={commonWrapper({ paddingBottom: 30 })}
            >
              <Image
                src={image.url}
                alt={image.filename}
                width={500}
                height={500}
                className={imageWrapper({
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 16,
                })}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Card>
    </div>
  );
}
