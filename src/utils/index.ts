export const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
    if (queryParams.title) {
      constructedQuery.$or = [
        { title: new RegExp(queryParams.title, "i") },
 
      ];
    }
    if (queryParams.tags) {
      console.log(queryParams.tags)
      constructedQuery.tags = {
        $all: Array.isArray(queryParams.tags)
          ? queryParams.tags
          : [queryParams.tags],
      };
    }
 
  

  
    return constructedQuery;
  };