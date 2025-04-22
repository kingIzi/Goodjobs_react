import { create } from "zustand";


const useUserStore = create((set) => ({
    dataLoading: true,
    hasError: false,
    errorMessage: '',
    setErrorMessage: (errorMessage) => set(() => ({ errorMessage })), 
    setHasError: (hasError) => set(() => ({ hasError })),
    setDataLoading: (dataLoading) => set(() => ({ dataLoading })),
    
      users: [],
      setUsers: (users) => set(() => ({ users })),
      pageNumber: 1,
      setPageNumber: (pageNumber) => set(() => ({ pageNumber })),
      hasMore: true,
      setHasMore: (hasMore) => set(() => ({ hasMore })),
    }));
    
    export default useUserStore;