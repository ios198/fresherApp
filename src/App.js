import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import ModalAddNew from "./components/ModalAddNew";
import { useState } from "react";
function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span>List Users:</span>
          <Button className="btn btn-sucess" onClick={() => setShow(true)}>
            Add New User
          </Button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew show={show} handleClose={handleClose} />
    </div>
  );
}

export default App;
