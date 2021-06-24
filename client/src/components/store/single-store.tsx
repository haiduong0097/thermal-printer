import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import receiptIcon from "../../assets/receipt.svg";
import pencilIcon from "../../assets/pencil.svg";
import trashIcon from "../../assets/trash.svg";
import { useStoreGlobalContext } from "../../contexts/store-context";
import { StoreDataType } from "../../utils/type";
import { useDispatch } from "react-redux";
import { handleDeleteStore } from "../../config/_action";

type SingleStoreProps = {
  data: StoreDataType;
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

const SingleStore: FC<SingleStoreProps> = ({ data }) => {
  const {
    _id,
    storeTypeBill,
    storeName,
    storeCode,
    storeAddress,
    storePhoneNumber,
    storeImageUrl,
  } = data;
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { setTargetUpdateStoreModal } = useStoreGlobalContext();

  const handleClickStoreDetail = (storeId: string) => {
    history.push(`/store/${storeId}`);
  };

  return (
    <Card className="shadow" border={"success"}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col className="col-8">
              <p className={`${styles.storeName} post-title mb-0`}>
                {storeName}
              </p>
              <span className={`${styles.title} text-muted`}>{storeCode}</span>{" "}
              <Badge pill variant={"success"}>
                {storeTypeBill}
              </Badge>
            </Col>
            <Col className="text-right">
              <Button
                variant="success"
                type="submit"
                size="sm"
                onClick={() => {
                  handleClickStoreDetail(_id);
                }}
              >
                Detail
              </Button>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          <Row>
            <Col>{`${storeAddress}`}</Col>
          </Row>
          <Row>
            <Col>{`${storePhoneNumber}`}</Col>
          </Row>
          <Row>
            <Col className="text-right">
              <Button
                className={styles.postButton}
                onClick={() => {
                  handleDeleteStore(dispatch, _id);
                }}
                target="_blank"
              >
                <img src={trashIcon} alt="play" width="16rem" height="16rem" />
              </Button>
              <Button
                className={styles.postButton}
                onClick={() => {
                  setTargetUpdateStoreModal(data);
                }}
                target="_blank"
              >
                <img src={pencilIcon} alt="play" width="16rem" height="16rem" />
              </Button>
              <Button
                className={styles.postButton}
                href={storeImageUrl}
                target="_blank"
              >
                <img
                  src={receiptIcon}
                  alt="play"
                  width="16rem"
                  height="16rem"
                />
              </Button>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleStore;
