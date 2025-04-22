import { fetchUsers } from '@/api/usersApi';
import useUserStore from '@/store/userStore';
import { useMutation, useQuery } from '@tanstack/react-query';



export const useFetchUsers = (userID) => {
    const setUsers = useUserStore((state) => state.setUsers);
    const pageNumber = useUserStore((state) => state.pageNumber);
    // const setHasMore = useUserStore((state) => state.setHasMore);
    const setDataLoading = useUserStore((state) => state?.setDataLoading);
    const setHasError = useUserStore((state) => state?.setHasError);
    const setErrorMessage = useUserStore((state) => state?.setErrorMessage);  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['users', pageNumber],
      queryFn: () => fetchUsers(userID),
    
    });

    if(!isLoading){
        setDataLoading(false);
    }

    if(data){
console.log(data)
if(data.status === 'success' ){
        setUsers(data.data)
    }
    else{
        setHasError(true);
        setErrorMessage(data.message);  
    }
    } 



    

    return { isLoading, isError };

 

  };