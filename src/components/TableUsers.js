import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserServices";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import { Button } from "react-bootstrap";
const TableUsers = (pops) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getUsers(1);
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data && res.data) {
      console.log(res);
      setListUsers(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };
  return (
    <div>
      <div className="my-3 add-new">
        <span>List Users:</span>
        <Button className="btn btn-sucess" onClick={() => setShow(true)}>
          Add New User
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={totalPages}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        // eslint-disable-next-line no-unused-vars
      />
      <ModalAddNew
        show={show}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
    </div>
  );
};

export default TableUsers;
