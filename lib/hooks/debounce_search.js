import { debounce } from "lodash";
import { useCallback } from "react";

const useDebouncedSearch = (onSearch) => {
  return useCallback(
    debounce((event) => {
      onSearch(event.target.value);
    }, 1000),
    []
  );
};

export default useDebouncedSearch;
