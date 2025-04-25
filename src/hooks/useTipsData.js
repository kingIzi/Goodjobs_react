
import { fetchTips } from "@/api/TipsApi";
import useTipsStore from "@/store/TipsStore";

import { useQuery } from "@tanstack/react-query";


export const useFetchTips = () => {
    const setTips = useTipsStore((state) => state.settips);
    const pageNumber = useTipsStore((state) => state.pageNumber);
    // const setHasMore = useTipsStore((state) => state.setHasMore);
    const setDataLoading = useTipsStore((state) => state?.setDataLoading);
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['tips', pageNumber],
      queryFn: () => fetchTips(),
    
    });

    if(!isLoading){
        setDataLoading(false);
    }
    const determineContent = (tip) => {
      switch(tip.tips_type) {
        case 'audio':
          return { type: 'Audio', url: tip.audio_content };
        case 'video':
          return { type: 'Video', url: tip.video_content };
        case 'content':
        default:
          return { type: 'Content', content: tip.writing_content };
      }
    };
  

    if(data){
      const transformedData = data.data.map(tip => ({
        id: tip.id,
        image: tip.tip_image,
        title: tip.tip_title,
        date: tip.datetime_posted.split('T')[0], // Extracting just the date part
        content: determineContent(tip)
      }));
      setTips(transformedData);



    }


    

    return { isLoading, isError };

 

  };