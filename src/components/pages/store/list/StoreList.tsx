import ItemList from "@/components/pages/store/list/itemList/ItemList";
import ItemFilter from "@/components/pages/store/list/itemFilter/ItemFilter";

export default function StoreList() {
  return (
    <section>
      <ItemFilter />
      <ItemList />
    </section>
  );
};