import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FormControlElement, NewItemDataType } from "../../utils/type";
import { useDispatch } from "react-redux";
import { addItemToStore } from "../../config/_action";
import AlertMessage from "../layout/alert-message";
import { DEFAULT_DELAY } from "../../utils/constant";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useItemGlobalContext } from "../../contexts/item-context";

const AddItemModal = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const storeId = _.get(params, ["storeId"], "") as string | null;

  const { showAddItemModal, setShowAddItemModal, setShowToast } =
    useItemGlobalContext();

  const [alert, setAlert] =
    useState<{ type: string; message: string } | null>(null);

  // State
  const [newStore, setNewStore] = useState<NewItemDataType>({
    isTopping: false,
    name: "",
    price: "",
    store: storeId || "",
  });

  const { isTopping, name, price } = newStore;

  const closeDialog = () => {
    setShowAddItemModal(false);
  };

  const onChangeNewItemForm = (event: React.ChangeEvent<FormControlElement>) =>
    setNewStore({ ...newStore, [event.target.name]: event.target.value });

  const onChangeItemTypeTypeForm = (
    event: React.ChangeEvent<FormControlElement>
  ) =>
    setNewStore({
      ...newStore,
      [event.target.name]: event.target.value === "topping",
    });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const { success, message } = await addItemToStore(
      dispatch,
      storeId || "",
      newStore
    );
    if (success) {
      setShowToast({
        show: true,
        message: message,
        type: "success",
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
    <Modal size="lg" show={showAddItemModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>🥤 Create new item for store</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <AlertMessage info={alert} />
        <Modal.Body>
          <Form.Group>
            <Form.Text id="title-help" className="text-danger">
              * Required
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Item name (Exp: Trân châu trắng)"
              aria-describedby="title-help"
              required
              name="name"
              value={name}
              onChange={onChangeNewItemForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="title-help" muted>
              <span className="text-danger">* Required</span>
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Item price (Exp: 5000)"
              required
              aria-describedby="title-help"
              name="price"
              value={price}
              onChange={onChangeNewItemForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Text id="title-help" muted>
              Type of item
            </Form.Text>
            <Form.Control
              as="select"
              name="isTopping"
              value={isTopping ? "topping" : "not topping"}
              onChange={onChangeItemTypeTypeForm}
            >
              <option value="not topping">Not Topping</option>
              <option value="topping">Topping</option>
            </Form.Control>
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

export default AddItemModal;
