import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { UpdateCreatedUser } from "../service/UserServices";
import { ToastContainer, toast } from "react-toastify";
const ModalEdit = (props) => {
  const { show, handleClose, selectedUser, handleUpdateEditUser } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [id, setId] = useState(0);
  const notifySucess = () => toast.success("Edit user sucessfully!");
  const notifyFaile = () => toast.error("Create user sucessfully!");
  useEffect(() => {
    if (show) {
      setName(selectedUser.first_name);
      setJob(selectedUser.last_name);
      setId(selectedUser.id);
    }
  }, [selectedUser]);
  const handlEditSelectedUser = async () => {
    let res = await UpdateCreatedUser(id, name, job);
    handleUpdateEditUser(id, name);
    notifySucess();
    handleClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job:</label>
              <input
                type="text"
                className="form-control"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlEditSelectedUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default ModalEdit;
