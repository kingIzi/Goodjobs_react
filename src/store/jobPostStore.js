import { create } from "zustand";


const useJobPostStore = create((set) => ({
    dataLoading: true,
    setDataLoading: (dataLoading) => set(() => ({ dataLoading })),
    
      jobPosts: [],
      setjobPosts: (jobPosts) => set(() => ({ jobPosts })),
      pageNumber: 1,
      setPageNumber: (pageNumber) => set(() => ({ pageNumber })),
      hasMore: true,
      setHasMore: (hasMore) => set(() => ({ hasMore })),
    }));
    
    export default useJobPostStore;