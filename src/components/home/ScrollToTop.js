import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ScrollToTop() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Scroll to top whenever the pathname changes

  // Optionally, you can add a scroll behavior based on your specific requirements

  return null;
}

export default ScrollToTop;
