import { fetchUserProfile } from "@/api/userProfileApi";
import { useQuery } from "@tanstack/react-query";

import useUserProfileStore from "@/store/userProfileStore";

export const useFetchUserProfileData = (userID) => {
    const setUserProfiles = useUserProfileStore((state) => state.setUserProfiles);
    const pageNumber = useUserProfileStore((state) => state.pageNumber);
    // const setHasMore = useUserProfileStore((state) => state.setHasMore);
    const setDataLoading = useUserProfileStore((state) => state?.setDataLoading);
    const setHasError = useUserProfileStore((state) => state?.setHasError);
    const setErrorMessage = useUserProfileStore((state) => state?.setErrorMessage); 
    const { data, isLoading, isError } = useQuery({
      queryKey: ['userProfile', pageNumber],
      queryFn: () => fetchUserProfile(userID),
    
    });

    if(!isLoading){
        setDataLoading(false);
    }

    if(data){
console.log(data);
      if(data.status === 'success' ){
        setUserProfiles(data.data)
          }
          else{
              setHasError(true);
              setErrorMessage(data.message);  
          }
          } 


    

    return { isLoading, isError };

 

  };