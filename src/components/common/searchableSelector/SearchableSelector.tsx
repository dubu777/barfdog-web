// src/components/pages/survey/searchableSelector/SearchableSelector.tsx

import React, { useState, useMemo, ReactNode } from "react";
import InputField from "@/components/common/inputField/InputField";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import { Option } from "@/types";
import { commonWrapper } from "@/styles/common.css";

interface SearchableSelectorProps {
  placeholder?: string; // InputField placeholder
  options: Option[]; // 전체 견종 옵션
  selectedValue: string | null; // 현재 선택된 값 (radio)
  onChange: (value: string) => void; // 선택 변경 시 호출
  type?: "radio" | "button";
  className?: string;
  rightElement?: ReactNode;
  emptyElement?: ReactNode;
}

export default function SearchableSelector({
  placeholder,
  options,
  selectedValue,
  onChange,
  type = "radio",
  className,
  rightElement,
  emptyElement,
}: SearchableSelectorProps) {
  const [query, setQuery] = useState("");

  // query가 변경될 때마다 부분 일치하는 견종만 필터링
  const filteredOptions = useMemo(() => {
    if (!query) return options; // 검색어가 없으면 전체 리스트
    const lowerQuery = query.toLowerCase();
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(lowerQuery)
    );
  }, [options, query]);

  return (
    <>
      <InputField
        placeholder={placeholder}
        type="text"
        searchButton
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 12,
        })}
      >
        {filteredOptions.length > 0
          ? filteredOptions.map((opt, index) => (
              <SurveyButton
                key={`${opt.label}-${index}`}
                label={opt.label}
                value={opt.value}
                inputType={type === "radio" ? "radio" : "normal"}
                isChecked={selectedValue === opt.value}
                onToggle={(val) => onChange?.(val)}
                className={className || ""}
                rightElement={rightElement}
              />
            ))
          : emptyElement || ""}
      </div>
    </>
  );
}
