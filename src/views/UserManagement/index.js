import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Col, Row, Table, Button, FormGroup } from 'reactstrap';
import { Pagination } from '../../components';
import { getUsers, showPopup, deleteUser, pageLoading } from '../../services';
import { userListSelector } from '../../modules';
import { useSelector, shallowEqual } from 'react-redux';
import { helper } from '../../utils';

const UserManagement = ({ history }) => {

  // selector
  const userList = useSelector(userListSelector, shallowEqual);

  // state
  const [paginationLimit] = useState(5);

  // variable

  const items = userList.data;
  const loading = userList.loading;
  const pagination = userList.pagination;
  const empty = !loading && items.length === 0;
  const paginationItems = helper.getPaginationItems(pagination?.totalPage);
  
  

  const getUserData = useCallback((page = 1) => {
    const payload = {
      path: `${paginationLimit}/${page}`,
      pagination: {
        page,
        limit: paginationLimit
      }
    };

    getUsers(payload);
  },[paginationLimit]);

  const handlePressPagination = value => {
    getUserData(value)
  };

  const handlePressEdit = userId => {
    history.push(`/user/edit/${userId}`);
  }

  const submitDelete = async userId => {

    try {
      pageLoading(true);
      await deleteUser(userId);
      await getUserData(pagination.page);
      pageLoading(false);
      showPopup({
        title: 'Completed!',
        message: 'Data was removed from table'
      })
    } catch (err) {
      pageLoading(false);
      showPopup({
        title: 'Error!',
        message: err?.message || 'Something Wrong!'
      })
    }

  }

  const handlePressDelete = userData => {
    showPopup({
      title: 'Warning!',
      message: (
        <p>Wanna to delete user <strong>({userData?.id}) {userData?.name}</strong> from table?</p>
      ),
      leftButtonTitle: 'Yes',
      rightButtonTitle: 'No',
      onPressLeft: () => submitDelete(userData?.id),
      onPressRight: () => {}
    });
  }


  useEffect(() => {
    getUserData();
  }, [getUserData]);

  


  const renderTableRow = () => {
    if(loading) {
      return (
        <tr>
          <td className="text-center" colSpan={4}>Loading...</td>
        </tr>
      );
    }

    if(empty) {
      return (
        <tr>
          <td className="text-center" colSpan={4}>Data is Empty</td>
        </tr>
      );
    }

    return (
      <React.Fragment>
        {items.map(item => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td className="text-right">
                <Button onClick={() => handlePressEdit(item.id)} size="sm" color="primary">Edit</Button>
                <Button onClick={() => handlePressDelete(item)} size="sm" color="danger" className="ml-2">Delete</Button>
              </td>
            </tr>
          )
        })}
      </React.Fragment>
    )
  }
  

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> User Management
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={12}>
                  <FormGroup>
                    <Button onClick={() => history.push('/user/create')} color="primary">Create User</Button>
                  </FormGroup>
                </Col>
                <Col xs={12}>
                  <Table responsive hover bordered>
                    <thead className="bg-primary">
                      <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Username</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRow()}
                    </tbody>
                  </Table>
                </Col>
                <Col xs={12}>
                  <Pagination 
                    items={paginationItems} 
                    currentPage={pagination?.page}
                    onClick={handlePressPagination}
                    totalPage={pagination?.totalPage}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

UserManagement.propTypes = {
  history: PropTypes.object.isRequired
};

export default UserManagement;
