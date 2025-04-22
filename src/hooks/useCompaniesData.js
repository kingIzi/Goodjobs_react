
import useCompaniesStore from "@/store/companiesStore";
import { fetchCompanies } from "@/api/companiesApi";
import { useQuery } from "@tanstack/react-query";


export const useFetchCompanies = () => {
    const setCompanies = useCompaniesStore((state) => state.setCompanies);
    const pageNumber = useCompaniesStore((state) => state.pageNumber);
    // const setHasMore = useCompaniesPostStore((state) => state.setHasMore);
    const setDataLoading = useCompaniesStore((state) => state?.setDataLoading);
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['companies', pageNumber],
      queryFn: () => fetchCompanies(),
    
    });

    if(!isLoading){
        setDataLoading(false);
    }

    if(data){

        setCompanies(data.data);

    }


    

    return { isLoading, isError };

 

  };