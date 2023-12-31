import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = (props) => {
  const {history} =props
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  });
  return null;
};
export default withRouter(ScrollToTop);
