// useSmoothScroll.js
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useSmoothScroll = () => {
  const navigate = useNavigate();

  const smoothScroll = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  }, []);

  const navigateAndScroll = useCallback(
    (path, id) => {
      navigate(path);
      setTimeout(() => {
        smoothScroll(id);
      }, 10);
    },
    [navigate, smoothScroll]
  );

  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        smoothScroll(hash);
      }
    };

    handleInitialHash();
  }, [smoothScroll]);

  return navigateAndScroll;
};

export default useSmoothScroll;
