

import { useState, useLayoutEffect } from 'react';

function useWindowScroll() {
    const [{left,top}, setScroll] = useState({left:0,top:0});
    useLayoutEffect(() => {
      function updateScroll() {
        var doc = document.documentElement;
        var left = (window.scrollX || doc.scrollLeft) - (doc.clientLeft || 0);
        var top = (window.scrollY || doc.scrollTop)  - (doc.clientTop || 0);

        setScroll({left,top});
      }
      window.addEventListener('scroll', updateScroll);
      updateScroll();
      return () => window.removeEventListener('scroll', updateScroll);
    }, []);
    return {left,top};
}

export default useWindowScroll;