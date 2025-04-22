import { useMutation, useQuery } from '@tanstack/react-query';
import useSummaryStore from '@/store/homeSummaryStore';
import { fetchSummary } from '@/api/userTransactionApi';

export const useFetchSummary = (userID) => {
    const setSummary = useSummaryStore((state) => state.setSummary);
    const pageNumber = useSummaryStore((state) => state.pageNumber);
    // const setHasMore = useSummaryStore((state) => state.setHasMore);
    const setDataLoading = useSummaryStore((state) => state?.setDataLoading);
    const setHasError = useSummaryStore((state) => state?.setHasError);
    const setErrorMessage = useSummaryStore((state) => state?.setErrorMessage);  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['summary', pageNumber],
      queryFn: () => fetchSummary(userID),
    
    });

    if(!isLoading){
        setDataLoading(false);
    }

    if(data){
console.log(data)
if(data.status === 'success' ){
        setSummary(data.data)
    }
    else{
        setHasError(true);
        setErrorMessage(data.message);  
    }
    } 



    

    return { isLoading, isError };

 

  };