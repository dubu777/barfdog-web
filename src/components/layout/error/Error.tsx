import { commonWrapper } from "@/styles/common.css";
import Header from "../header/Header";
import EmptyList from "@/components/ui/emptyList/EmptyList";

interface ErrorProps {
  errorMessage?: string;
}

export default function Error({ 
  errorMessage = '현재 데이터를 불러올 수 없습니다\n나중에 다시 시도해 주세요'
}: ErrorProps) {
  return (
    <section>
      <Header 
        showBackButton
      />
      <div className={commonWrapper({
        minHeight: 'fullWithHeader',
        backgroundColors: 'gray50',
        direction: 'col',
      })}
      >
        <EmptyList
          characterText="댕..."
          title={errorMessage}
        />
      </div>
    </section>
  );
}