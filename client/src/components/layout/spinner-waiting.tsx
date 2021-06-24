import Spinner from "react-bootstrap/Spinner";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: any) => {
  return {
    spinnerContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      MozTransform: "translateX(-50%) translateY(-50%)",
      WebkitTransform: "translateX(-50%) translateY(-50%)",
      transform: "translateX(-50%) translateY(-50%)",
    },
    spinnerContent: {
      width: "3rem",
      height: "3rem",
    },
  };
});

const SpinnerWaiting = () => {
  const styles = useStyles();
  return (
    <>
      <div className={styles.spinnerContainer}>
        <Spinner
          className={styles.spinnerContent}
          animation="border"
          variant="info"
        />
      </div>
    </>
  );
};

export default SpinnerWaiting;
