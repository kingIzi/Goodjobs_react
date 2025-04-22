import { create } from "zustand";


const useSummaryStore = create((set) => ({
    dataLoading: true,
    hasError: false,
    errorMessage: '',
    setErrorMessage: (errorMessage) => set(() => ({ errorMessage })), 
    setHasError: (hasError) => set(() => ({ hasError })),
    setDataLoading: (dataLoading) => set(() => ({ dataLoading })),
    
      summary: {},
      setSummary: (summary) => set(() => ({ summary })),
      pageNumber: 1,
      setPageNumber: (pageNumber) => set(() => ({ pageNumber })),
      hasMore: true,
      setHasMore: (hasMore) => set(() => ({ hasMore })),
    }));
    
    export default useSummaryStore;