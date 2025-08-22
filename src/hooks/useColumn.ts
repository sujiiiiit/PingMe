import { useDispatch, useSelector } from "react-redux";
import { setActiveColumn } from "@/slices/columnSlice";
import type { RootState } from "@/store";
import type { ActiveColumnType } from "@/slices/columnSlice";

export const useColumn = () => {
  const dispatch = useDispatch();
  const activeColumn = useSelector((state: RootState) => state.column.activeColumn);
  const changeColumn = (column: ActiveColumnType) => {
    dispatch(setActiveColumn(column));
  };
  return { activeColumn, changeColumn };
};
