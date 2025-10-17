import { useState, useCallback, useMemo } from 'react';

export interface UseMultiSelectProps<T> {
  items: T[];
  getItemId: (item: T) => string | number;
  initialSelectedIds?: (string | number)[];
}

export interface UseMultiSelectReturn<T> {
  selectedIds: (string | number)[];
  isAllSelected: boolean;
  isIndeterminate: boolean;
  selectedItems: T[];
  toggleItem: (id: string | number) => void;
  toggleAll: () => void;
  selectAll: () => void;
  deselectAll: () => void;
  isSelected: (id: string | number) => boolean;
}

export function useMultiSelect<T>({
  items,
  getItemId,
  initialSelectedIds = [],
}: UseMultiSelectProps<T>): UseMultiSelectReturn<T> {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>(initialSelectedIds);

  const itemIds = useMemo(() => items.map(getItemId), [items, getItemId]);

  const isAllSelected = useMemo(() => {
    return itemIds.length > 0 && itemIds.every(id => selectedIds.includes(id));
  }, [itemIds, selectedIds]);

  const isIndeterminate = useMemo(() => {
    return selectedIds.length > 0 && selectedIds.length < itemIds.length;
  }, [selectedIds, itemIds]);

  const selectedItems = useMemo(() => {
    return items.filter(item => selectedIds.includes(getItemId(item)));
  }, [items, selectedIds, getItemId]);

  const toggleItem = useCallback((id: string | number) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  }, []);

  const toggleAll = useCallback(() => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds([...itemIds]);
    }
  }, [isAllSelected, itemIds]);

  const selectAll = useCallback(() => {
    setSelectedIds([...itemIds]);
  }, [itemIds]);

  const deselectAll = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback((id: string | number) => {
    return selectedIds.includes(id);
  }, [selectedIds]);

  return {
    selectedIds,
    isAllSelected,
    isIndeterminate,
    selectedItems,
    toggleItem,
    toggleAll,
    selectAll,
    deselectAll,
    isSelected,
  };
}
