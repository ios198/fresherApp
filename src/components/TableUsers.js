import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../service/UserServices";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEdit from "./ModalEdit";
import ModalDelete from "./ModalDelete";
import { Button } from "react-bootstrap";
const TableUsers = (pops) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedUser, setSelectedUser] = useState([]);
  const [isshowModalNew, setIsshowModalNew] = useState(false);
  const [isshowModalEdit, setIsshowModalEdit] = useState(false);
  const [isshowModalDelete, setIsshowModalDelete] = useState(false);
  useEffect(() => {
    getUsers(1);
  }, []);

  const handleEditClick = (item) => {
    setSelectedUser(item);
    setIsshowModalEdit(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedUser(item);
    setIsshowModalDelete(true);
  };

  const handleClose = () => {
    setIsshowModalNew(false);
    setIsshowModalEdit(false);
    setIsshowModalDelete(false);
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

  const handleUpdateEditUser = (id, name) => {
    //Find index of specific object using findIndex method.
    const objIndex = listUsers.findIndex((obj) => obj.id === id);

    //Update object's name property.
    listUsers[objIndex].first_name = name;
  };

  const handleUpdateDeleteUser = (id) => {
    console.log("--", id);
    let filtered = listUsers.filter(function (el) {
      return el.id !== id;
    });
    setListUsers(filtered);
  };
  return (
    <div>
      <div className="my-3 add-new">
        <span>List Users:</span>
        <Button
          className="btn btn-sucess"
          onClick={() => setIsshowModalNew(true)}
        >
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
            <th>Action</th>
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
                  <td>
                    <Button
                      className="mx-1"
                      onClick={() => handleEditClick(item)}
                    >
                      EDIT
                    </Button>
                    <Button
                      className="mx-1"
                      onClick={() => handleDeleteClick(item)}
                    >
                      DELETE
                    </Button>
                  </td>
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
        show={isshowModalNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEdit
        show={isshowModalEdit}
        handleClose={handleClose}
        selectedUser={selectedUser}
        handleUpdateEditUser={handleUpdateEditUser}
      />
      <ModalDelete
        show={isshowModalDelete}
        handleClose={handleClose}
        selectedUser={selectedUser}
        handleUpdateEditUser={handleUpdateDeleteUser}
      />
    </div>
  );
};

export default TableUsers;
