import { create } from "zustand";


const useTransactionStore = create((set) => ({
    dataLoading: true,
    setDataLoading: (dataLoading) => set(() => ({ dataLoading })),
    
      transactions: [],
      setTransactions: (transactions) => set(() => ({ transactions })),
      pageNumber: 1,
      setPageNumber: (pageNumber) => set(() => ({ pageNumber })),
      hasMore: true,
      setHasMore: (hasMore) => set(() => ({ hasMore })),
      hasError: false,
      errorMessage: '',
      setErrorMessage: (errorMessage) => set(() => ({ errorMessage })), 
      setHasError: (hasError) => set(() => ({ hasError })),
    }));
    
    export default useTransactionStore;