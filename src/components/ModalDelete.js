import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../service/UserServices";
import { ToastContainer, toast } from "react-toastify";
const ModalDelete = (props) => {
  const { show, handleClose, selectedUser, handleUpdateEditUser } = props;
  const notifySucess = () => toast.success("Delete user sucessfully!");
  const handleDeletClick = async () => {
    let req = await deleteUser(selectedUser.id);
    handleUpdateEditUser(selectedUser.id);
    handleClose();
    notifySucess();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this user</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletClick}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalDelete;
