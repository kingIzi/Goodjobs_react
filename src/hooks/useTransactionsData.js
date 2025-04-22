import { fetchTransactions } from '@/api/transactionsApi';
import { fetchUsers } from '@/api/usersApi';
import useTransactionStore from '@/store/transactionStore';

import { useMutation, useQuery } from '@tanstack/react-query';



export const useFetchTransactions = (userID) => {
    const setTransactions = useTransactionStore((state) => state.setTransactions);
    const pageNumber = useTransactionStore((state) => state.pageNumber);
    // const setHasMore = useTransactionStore((state) => state.setHasMore);
    const setDataLoading = useTransactionStore((state) => state?.setDataLoading);
    const setHasError = useTransactionStore((state) => state?.setHasError);
    const setErrorMessage = useTransactionStore((state) => state?.setErrorMessage);  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['transactions', pageNumber],
      queryFn: () => fetchTransactions(userID),
    
    });

    if(!isLoading){
        setDataLoading(false);
    }

    if(data){

      if(data.status === 'success' ){
              setTransactions(data.data)
          }
          else{
              setHasError(true);
              setErrorMessage(data.message);  
          }
          } 
      
      
      


    

    return { isLoading, isError };

 

  };