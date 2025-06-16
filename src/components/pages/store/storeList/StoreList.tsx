import * as styles from './StoreList.css';
import ItemList from "@/components/pages/store/storeList/itemList/ItemList";
import ItemFilter from "@/components/pages/store/storeList/itemFilter/ItemFilter";

const StoreList = () => {
  return (
    <section className={styles.storeListContainer}>
      <ItemFilter />
      <ItemList />
    </section>
  );
};

export default StoreList;