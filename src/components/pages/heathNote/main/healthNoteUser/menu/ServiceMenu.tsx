import { commonWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";
import { HEALTH_NOTE_SERVICE_MENU } from "@/constants";

export default function ServiceMenu({ petId }: { petId: number }) {
  const router = useRouter();

  return (
    <article className={commonWrapper({
      direction: 'col',
      align: 'start',
      justify: 'start',
      gap: 12,
      paddingBottom: 40,
    })}>
      <Text type="headline1" color="gray800">추천 서비스</Text>
      {HEALTH_NOTE_SERVICE_MENU.map((menu) => (
        <button 
          key={menu.url} 
          className={commonWrapper({})} 
          onClick={() => router.push(`/health-note/${petId}${menu.url}`)}
        >
          <Card
            shadow="light"
            direction="row"
            align="center"
            justify="between"
            padding={16}
            borderRadius={12}
          >
            <div className={commonWrapper({ justify: 'start', gap: 12 })}>
              <SvgIcon src={menu.imageUrl} size={menu.width} height={menu.height} />
              <Text type="headline1" color="gray800">{menu.label}</Text>
            </div>
            <SvgIcon src={ArrowIcon} size={20} color="gray600" />
          </Card>
        </button>
      ))}
    </article>
  );
}