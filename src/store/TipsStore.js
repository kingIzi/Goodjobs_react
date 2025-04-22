import { create } from "zustand";


const useTipsStore = create((set) => ({
    dataLoading: true,
    setDataLoading: (dataLoading) => set(() => ({ dataLoading })),
    
      tips: [],
      settips: (tips) => set(() => ({ tips })),
      pageNumber: 1,
      setPageNumber: (pageNumber) => set(() => ({ pageNumber })),
      hasMore: true,
      setHasMore: (hasMore) => set(() => ({ hasMore })),
    }));
    
    export default useTipsStore;