import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import addIcon from "../assets/plus-circle-fill.svg";
import { IRootState } from "../config/_reducers";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import SingleStore from "../components/store/single-store";
import { makeStyles } from "@material-ui/core";
import { StoreGlobalContext } from "../contexts/store-context";
import AddStoreModal from "../components/store/add-store-modal";
import { useEffect } from "react";
import SpinnerWaiting from "../components/layout/spinner-waiting";
import { useState } from "react";
import ToastMessage from "../components/layout/toast-message";
import UpdateStoreModal from "../components/store/update-store-modal ";
import { StoreDataType } from "../utils/type";
import { getAllStore } from "../config/_action";

const useStyles = makeStyles((theme: any) => {
  return {
    btnFloating: {
      position: "fixed",
      right: "3rem",
      bottom: "3rem",
      background: "transparent",
      border: "none",

      "&:hover": {
        background: "transparent",
      },
      "&:focus": {
        outline: "none",
        background: "transparent",
        border: "none",
        boxShadow: "none",
      },
      "&:active": {
        outline: "none",
        background: "transparent",
        border: "none",
        boxShadow: "none",
      },
    },
  };
});

const StorePage = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const state = useSelector((state: IRootState) => state);

  const [showAddStoreModal, setShowAddStoreModal] = useState(false);
  const [targetUpdateStoreModal, setTargetUpdateStoreModal] =
    useState<StoreDataType | null>(null);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    message: string;
    type: string | null;
  }>({
    show: false,
    message: "",
    type: null,
  });

  // Start: Get all stores
  useEffect(() => {
    getAllStore(dispatch);
  }, [dispatch]);

  // Show name user if have none store
  const {
    user: { username },
  } = state.authState;

  // Get data store, fetch by getAllStore
  const { stores, storeLoading } = state.storeState;

  const listStoreNone = () => {
    return (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Oanh small</Card.Title>
            <Card.Text>
              Click the button below to track your first store if you are Admin
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setShowAddStoreModal(true);
              }}
            >
              Create now!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  };

  const renderListStore = () => {
    if (storeLoading) {
      return <SpinnerWaiting />;
    } else if (stores.length === 0) {
      return <>{listStoreNone()}</>;
    } else {
      return (
        <>
          <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
            {_.map(stores, (item) => {
              return (
                <Col key={item._id} className="my-2">
                  <SingleStore data={item} />
                </Col>
              );
            })}
          </Row>

          {/* Open Add Post Modal */}
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip id="add-tooltip">Create a new store</Tooltip>}
          >
            <Button
              className={styles.btnFloating}
              onClick={() => {
                setShowAddStoreModal(true);
              }}
            >
              <img src={addIcon} alt="add-post" width="60" height="60" />
            </Button>
          </OverlayTrigger>
        </>
      );
    }
  };

  return (
    <>
      <StoreGlobalContext.Provider
        value={{
          showAddStoreModal,
          setShowAddStoreModal,
          targetUpdateStoreModal,
          setTargetUpdateStoreModal,
          setShowToast,
        }}
      >
        {renderListStore()}
        {showAddStoreModal && <AddStoreModal />}
        {targetUpdateStoreModal && <UpdateStoreModal />}
        {showToast.show && (
          <ToastMessage showToast={showToast} setShowToast={setShowToast} />
        )}
      </StoreGlobalContext.Provider>
    </>
  );
};

export default StorePage;
