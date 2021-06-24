import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FC } from "react";
import { makeStyles } from "@material-ui/core";
import { ItemDataType } from "../../utils/type";
import { formatToCurrency } from "../../utils/helper";
import trashIcon from "../../assets/trash.svg";
import { handleDeleteItem } from "../../config/_action";
import { useDispatch } from "react-redux";

type SingleStoreProps = {
  data: ItemDataType;
};

const useStyles = makeStyles((theme: any) => {
  return {
    title: {
      fontSize: "0.6rem",
    },
    storeName: {
      fontFamily: "'Dela Gothic One', cursive;",
      fontSize: "1rem",
    },
    buttonShowImage: {
      border: `1px solid ${theme.palette.success.main}`,
    },
    postButton: {
      paddingTop: "0",
      background: "transparent",
      border: "none",
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    },
  };
});

const SingleItem: FC<SingleStoreProps> = ({ data }) => {
  const { isTopping, name, price, _id } = data;
  const styles = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className="shadow" border={"success"}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col className="col-8 ">
              <p className={`${styles.storeName} post-title mb-0`}>{name}</p>
            </Col>
            <Col className="col text-right">
              <Badge pill variant={"success"}>
                {isTopping ? "Topping" : ""}
              </Badge>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          <Row>
            <Col>{`Price: ${formatToCurrency(price)}`}</Col>
          </Row>
          <Row>
            <Col className="text-right">
              <Button
                className={styles.postButton}
                onClick={() => {
                  handleDeleteItem(dispatch, _id);
                }}
                target="_blank"
              >
                <img src={trashIcon} alt="play" width="16rem" height="16rem" />
              </Button>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleItem;
