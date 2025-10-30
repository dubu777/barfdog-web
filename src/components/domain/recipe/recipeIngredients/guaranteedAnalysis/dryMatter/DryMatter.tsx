import { commonWrapper } from "@/styles/common.css";
import { dryMatterDot } from "./DryMatter.css";
import Text from "@/components/ui/text/Text";
import { DRY_MATTER_MAP } from "@/constants/recipes";
import { DryMatterValues } from "@/types/recipes";

interface DryMatterProps {
  dryMatter: DryMatterValues;
}
export default function DryMatter({ dryMatter }: DryMatterProps) {
  const dryMatterList = Object.entries(DRY_MATTER_MAP);

  return (
    <div className={commonWrapper({ direction: 'col', gap: 8, align: 'start' })}>
      <div className={commonWrapper({ gap: 4, align: 'center', justify: 'start' })}>
        <Text type="headline2">DM(Dry Matter)</Text>
        <Text type="caption" color='gray700'>(100g 기준)</Text>
      </div>
      <div className={commonWrapper({ gap: 16, align: 'start' })}>
        <div className={commonWrapper({ direction: 'col', gap: 6 })}>
          {dryMatterList.slice(0, 14).map(([key, value]) => (
            <div key={key} className={commonWrapper({ gap: 4, })}>
              <Text type="caption">{key}</Text>
              <span className={dryMatterDot} />
              <Text type="caption2" color='gray700'>{Number(dryMatter[key])}{value}</Text>
            </div>
          ))}
        </div>
        <div className={commonWrapper({ direction: 'col', gap: 6 })}>
          {dryMatterList.slice(14, dryMatterList.length).map(([key, value]) => (
            <div key={key} className={commonWrapper({ gap: 4, })}>
              <Text type="caption">{key}</Text>
              <span className={dryMatterDot} />
              <Text type="caption2" color='gray700'>{Number(dryMatter[key])}{value}</Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}