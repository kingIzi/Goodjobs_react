import { fetchJobPosts } from "@/api/jobPostsApi";
import useJobPostStore from "@/store/jobPostStore";
import { useQuery } from "@tanstack/react-query";


export const useFetchJobPosts = () => {
    const setJobPosts = useJobPostStore((state) => state.setjobPosts);
    const pageNumber = useJobPostStore((state) => state.pageNumber);
    // const setHasMore = useJobPostStore((state) => state.setHasMore);
    const setDataLoading = useJobPostStore((state) => state?.setDataLoading);
  
    const { data, isLoading, isError } = useQuery({
      queryKey: ['jobPosts', pageNumber],
      queryFn: () => fetchJobPosts(),
    
    });

    if(!isLoading){
        setDataLoading(false);
    }

    if(data){
        const transformedData = data.data.map(jobPost => ({
          jobID:jobPost.id,
            img: jobPost.company.image,
            name: jobPost.company.name,
            email: jobPost.job_post_url,
            job: [jobPost.job_title, jobPost.location],
            date: jobPost.datetime_posted.split('T')[0],
            deadline: jobPost.deadline_day !== null ? jobPost.deadline_day.split('T')[0] : "No Deadline",
             // Extracting just the date part
          }));

          setJobPosts(transformedData);

    }


    

    return { isLoading, isError };

 

  };