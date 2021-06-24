import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { FormControlElement, StoreDataType } from "../../utils/type";
import { useDispatch } from "react-redux";
import { handleUpdateStore } from "../../config/_action";
import { useStoreGlobalContext } from "../../contexts/store-context";
import AlertMessage from "../layout/alert-message";
import { DEFAULT_DELAY } from "../../utils/constant";

const UpdateStoreModal = () => {
  const dispatch = useDispatch();
  const { targetUpdateStoreModal, setTargetUpdateStoreModal, setShowToast } =
    useStoreGlobalContext();

  const [alert, setAlert] =
    useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    // fetch data by id
  }, []);

  // State
  const [updateStore, setUpdateStore] = useState<StoreDataType>(
    targetUpdateStoreModal || {
      storeTypeBill: "58",
      storeName: "",
      storeCode: "",
      storeAddress: "",
      storePhoneNumber: "",
      description: "",
      storeImageUrl: "",
      _id: "",
    }
  );

  const {
    storeTypeBill,
    storeName,
    storeCode,
    storeAddress,
    storePhoneNumber,
    description,
    storeImageUrl,
  } = updateStore;

  const closeDialog = () => {
    setTargetUpdateStoreModal(null);
  };

  const onChangeNewStoreForm = (event: React.ChangeEvent<FormControlElement>) =>
    setUpdateStore({ ...updateStore, [event.target.name]: event.target.value });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const { success, message } = await handleUpdateStore(dispatch, updateStore);
    if (success) {
      setShowToast({
        show: true,
        message,
        type: success,
      });
      closeDialog();
    } else {
      setAlert({
        type: "danger",
        message: message || "Something error!",
      });
      setTimeout(() => setAlert(null), DEFAULT_DELAY);
    }
  };

  return (
    <Modal size="lg" show={targetUpdateStoreModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>🏠 Upgrade your awesome store</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <AlertMessage info={alert} />
        <Modal.Body>
          <Form.Group>
            <Form.Text id="title-help" muted>
              Type of thermal printer the store uses
            </Form.Text>
            <Form.Control
              as="select"
              name="storeTypeBill"
              value={storeTypeBill}
              onChange={onChangeNewStoreForm}
            >
              <option value="58">58mm</option>
              <option value="80">80mm</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Text id="title-help" className="text-danger">
              * Required
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Name of store (Exp: The Coffee House)"
              aria-describedby="title-help"
              required
              name="storeName"
              value={storeName}
              onChange={onChangeNewStoreForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="title-help" muted>
              <span className="text-danger">* Can't edit</span> Each store have
              code unique
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Code of store (Exp: THE_COFFEE_HOUSE)"
              required
              aria-describedby="title-help"
              name="storeCode"
              value={storeCode}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="title-help" className="text-danger">
              * Required
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Store address (Exp: số 1, Tân Xuân, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội)"
              required
              aria-describedby="title-help"
              name="storeAddress"
              value={storeAddress}
              onChange={onChangeNewStoreForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="title-help" className="text-danger">
              * Required
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Phone number (Exp: 0918273645)"
              required
              aria-describedby="title-help"
              name="storePhoneNumber"
              value={storePhoneNumber}
              onChange={onChangeNewStoreForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description. Write anything here."
              name="description"
              value={description}
              onChange={onChangeNewStoreForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Invoice template image URL"
              name="storeImageUrl"
              value={storeImageUrl}
              onChange={onChangeNewStoreForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Build it!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateStoreModal;
