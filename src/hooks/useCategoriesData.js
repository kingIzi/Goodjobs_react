

import { fetchCategories } from "@/api/categoriesApi";
import useCategoriesStore from "@/store/categoriesStore";
import { useQuery } from "@tanstack/react-query";


export const useFetchCategories = () => {
    const setCategories = useCategoriesStore((state) => state.setCategories);
    const pageNumber = useCategoriesStore((state) => state.pageNumber);
    // const setHasMore = useCategoriesPostStore((state) => state.setHasMore);
    const setDataLoading = useCategoriesStore((state) => state?.setDataLoading);
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['categories', pageNumber],
      queryFn: () => fetchCategories(),
    
    });

    if(!isLoading){
        setDataLoading(false);
    }

    if(data){

        setCategories(data.data);

    }


    

    return { isLoading, isError };

 

  };