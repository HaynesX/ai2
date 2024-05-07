import { useState } from 'react';


const changeUrlHash = (hash: string) => {
  window.location.hash = hash;
}


function useTransitionContent(initialPage = 'main') {
  const [pageStack, setPageStack] = useState([initialPage]);

  const navigateTo = (page: any, hash?: any) => {
    setPageStack((prev) => [...prev, page]);
    if (hash) {
      changeUrlHash(hash);
    }

  };

  const navigateBack = () => {
    setPageStack((prev) => prev.slice(0, prev.length - 1));
  };

  const currentPage = pageStack[pageStack.length - 1];

  return { currentPage, navigateTo, navigateBack };
}

export default useTransitionContent;
