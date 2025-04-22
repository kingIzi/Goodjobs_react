import { create } from "zustand";


const useUserProfileStore = create((set) => ({
    dataLoading: true,
    setDataLoading: (dataLoading) => set(() => ({ dataLoading })),
    
      userProfiles: [],
      setUserProfiles: (userProfiles) => set(() => ({ userProfiles  })),
      pageNumber: 1,
      setPageNumber: (pageNumber) => set(() => ({ pageNumber })),
      hasMore: true,
      setHasMore: (hasMore) => set(() => ({ hasMore })),
      hasError: false,
      errorMessage: '',
      setErrorMessage: (errorMessage) => set(() => ({ errorMessage })), 
      setHasError: (hasError) => set(() => ({ hasError })),
    }));
    
    export default useUserProfileStore;