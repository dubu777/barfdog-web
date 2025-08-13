import { ITEM_TAG_COLOR } from "@/constants/store";
import { ItemTag } from "@/types";

export function parseItemTags(iconString: string) {
  return iconString
    ?.split(',')
    .filter(tag => tag.trim() !== '')
    .map(tag => ({
      tag,
      color: ITEM_TAG_COLOR[tag],
    })) as ItemTag[];
}
