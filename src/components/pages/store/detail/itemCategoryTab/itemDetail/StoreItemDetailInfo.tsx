"use client";

import { commonWrapper, sanitizedHTML } from "@/styles/common.css";
import { useEffect, useMemo, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";
import parse from "html-react-parser";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";

interface ItemDetailProps {
  contents: string;
  description: string;
}

export default function StoreItemDetailInfo({
  contents,
  description,
}: ItemDetailProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const cleanHTML = useMemo(
    () => (contents ? DOMPurify.sanitize(contents) ?? "" : ""),
    [contents]
  );

  // HTML 콘텐츠가 로드된 후 observer 재시작을 위한 이벤트 발생
  useEffect(() => {
    if (contentRef.current && cleanHTML) {
      // DOM이 변경되었음을 알리는 커스텀 이벤트 발생
      const event = new CustomEvent("contentLoaded", {
        detail: { element: contentRef.current },
      });
      window.dispatchEvent(event);
    }
  }, [cleanHTML]);

  return (
    <>
      <div
        className={commonWrapper({
          align: "start",
          justify: "start",
          gap: 32,
          padding: 20,
        })}
      >
        <Text type="body3" color="gray700" noShrink>
          상품 Tip!
        </Text>
        <Text type="label2" color="gray800">
          {description}
        </Text>
      </div>
      <Divider height={1} color="gray100" />
      <div
        ref={contentRef}
        className={`${sanitizedHTML} ${commonWrapper({
          padding: 20,
          direction: "col",
          align: "start",
        })}`}
      >
        {parse(cleanHTML)}
      </div>
    </>
  );
}
