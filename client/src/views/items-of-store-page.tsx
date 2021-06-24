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
import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import SpinnerWaiting from "../components/layout/spinner-waiting";
import { useState } from "react";
import ToastMessage from "../components/layout/toast-message";
import UpdateStoreModal from "../components/store/update-store-modal ";
import { StoreDataType } from "../utils/type";
import { useParams } from "react-router-dom";
import { getAllItemByStore } from "../config/_action";
import SingleItem from "../components/itemOfStore/single-item";
import AddItemModal from "../components/itemOfStore/add-item-modal";
import { ItemGlobalContext } from "../contexts/item-context";

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

const ItemsOfStorePage = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const state = useSelector((state: IRootState) => state);
  const params = useParams();
  const storeId = _.get(params, ["storeId"], null) as string | null;

  const [showAddItemModal, setShowAddItemModal] = useState(false);
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

  // Start: Fetch all item of store
  useEffect(() => {
    if (storeId) {
      dispatch(getAllItemByStore(storeId));
    }
  }, [storeId, dispatch]);

  // Show name user if have none store
  const {
    user: { username },
  } = state.authState;

  // Get data store, fetch by getAllStore
  const { itemsOfStore, targetStore, itemLoading } = state.itemState;

  const listItemNone = () => {
    return (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to your store</Card.Title>
            <Card.Text>Your store very clean.</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                setShowAddItemModal(true);
              }}
            >
              Create item now!
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  };

  const renderInfoTargetStore = () => {
    return (
      <>
        <div className="ml-4">
          <Row className="row-cols-1 g-4 mx-auto mt-3">
            {`List item of "${targetStore.storeName}" store`}
          </Row>
        </div>
      </>
    );
  };

  const renderListStore = () => {
    if (itemLoading) {
      return <SpinnerWaiting />;
    } else if (itemsOfStore.length === 0) {
      return <>{listItemNone()}</>;
    } else {
      return (
        <>
          {renderInfoTargetStore()}
          <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
            {_.map(itemsOfStore, (item) => {
              return (
                <Col key={item._id} className="my-2">
                  <SingleItem data={item} />
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
                setShowAddItemModal(true);
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
      <ItemGlobalContext.Provider
        value={{
          storeId: storeId || "",
          showAddItemModal,
          setShowAddItemModal,
          targetUpdateStoreModal,
          setTargetUpdateStoreModal,
          setShowToast,
        }}
      >
        {renderListStore()}
        {showAddItemModal && <AddItemModal />}
        {targetUpdateStoreModal && <UpdateStoreModal />}
        {showToast.show && (
          <ToastMessage showToast={showToast} setShowToast={setShowToast} />
        )}
      </ItemGlobalContext.Provider>
    </>
  );
};

export default ItemsOfStorePage;
