import { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  openSearch as openSearchAction,
  closeSearch as closeSearchAction,
  setSearchContent as setSearchContentAction,
  clearSearchContent as clearSearchContentAction,
} from "../slices/searchSlice";

export const useSearch = () => {
  const dispatch = useDispatch();
  const searchIsOpen = useSelector((state: RootState) => state.search.searchIsOpen);
  const openSearch = useCallback(() => dispatch(openSearchAction()), [dispatch]);
  const closeSearch = useCallback(() => dispatch(closeSearchAction()), [dispatch]);
  return { searchIsOpen, openSearch, closeSearch };
};

export const useClearSearch = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const clearInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    dispatch(clearSearchContentAction());
  }, [dispatch]);
  return { inputRef, clearInput };
};

export const useSearchInput = () => {
  const dispatch = useDispatch();
  const searchContent = useSelector((state: RootState) => state.search.searchContent);
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchContentAction(event.target.value));
    },
    [dispatch]
  );
  const setSearchContent = useCallback(
    (val: string) => dispatch(setSearchContentAction(val)),
    [dispatch]
  );
  return { searchContent, handleSearchChange, setSearchContent };
};
