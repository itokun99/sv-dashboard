import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Col, Row, Button, Form, FormGroup, Input, FormText, Label } from 'reactstrap';
import { getUserById, showPopup, createUser, updateUser } from '../../../services';
import { useForm } from '../../../utils';

const CreateUser = ({ history, match }) => {

  const userId = match?.params?.userId;
  const isEdit = userId ? true : false;

  const [form, setForm] = useForm({
    name: '',
    username: '',
    password: ''
  })

  const [error, setError] = useForm({
    name: '',
    username: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setForm(value, name);
  }

  const validation = () => {
    let hasError = false;

    Object.keys(error).forEach(field => {
      let fieldError = false;
      if(!form[field]) {
        hasError = true;
        fieldError = true;
        setError(`${field} is required`, field);
      }

      if(form[field] && (field === 'username' || field === 'name') && form[field].length < 3) {
        hasError = true;
        fieldError = true;
        setError(`${field} minimum 3 characters`, field);
      }

      if(form[field] && field === 'password' && form[field].length < 7) {
        hasError = true;
        fieldError = true;
        setError(`${field} minimum 7 characters`, field);
      }

      if(!fieldError) {
        setError('', field);
      }
    })

    return hasError;
  }

  const handleSubmitForm = async e => {
    if(e) e.preventDefault();

    const isError = validation();

    if(isError) {
      return;
    }


    try {
      setLoading(true);
      if(isEdit) {
        await updateUser(userId, form);
      } else {
        await createUser(form);
      }
      setLoading(false);

      if(!isEdit) {
        setForm(null, 'reset')
      }
      showPopup({
        title: 'Completed!',
        message: 'Data has saved!'
      })
    } catch (err) {
      setLoading(false);
      showPopup({
        title: 'Error!',
        message: err?.message || 'Something Wrong'
      });
    }
  };

  const handlePressCancel = () => {
    if(form.name || form.username || form.password) {
      return showPopup({
        title: 'Warning!',
        message: 'Are you sure you cancel? the data will be lost',
        leftButtonTitle: 'Yes',
        rightButtonTitle: 'No',
        onPressLeft: () => history.push('/user'),
        onPressRight: () => {}
      });
    }

    return history.push('/user');
  };

  const getUserData = useCallback(() => {
    setLoading(true);
    getUserById(userId).then(data => {
      setLoading(false);
      setForm({
        name: data?.name,
        username: data?.username
      }, 'multiple')
    }).catch(err => {
      setLoading(false);
      showPopup({
        title: 'Error!',
        message: err?.message || 'Something Wrong'
      });
      history.replace('/user')
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    if(userId) {
      getUserData() 
    }
  }, [getUserData, userId])

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> {isEdit ? 'Edit User' : 'Create User'}
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs={12}>
                  <Form onSubmit={handleSubmitForm}>
                    <FormGroup>
                      <Label for="name">Name</Label>
                      <Input
                        disabled={loading}
                        required
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g: Indrawan Lisanto"
                        onChange={handleChangeInput}
                        value={form.name}
                        invalid={error.name.length > 0}
                      />
                      {error.name && (
                        <FormText color="danger">{error.name}</FormText>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input 
                        disabled={loading}
                        required
                        id="username"
                        name="username"
                        type="text"
                        placeholder="e.g: indrawan99"
                        onChange={handleChangeInput}
                        value={form.username}
                        invalid={error.username.length > 0}
                      />
                      {error.username && (
                        <FormText color="danger">{error.username}</FormText>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input 
                        disabled={loading}
                        required
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        onChange={handleChangeInput}
                        value={form.password}
                        invalid={error.password.length > 0}
                      />
                      {error.password && (
                        <FormText color="danger">{error.password}</FormText>
                      )}
                    </FormGroup>
                    <Button disabled={loading} color="success" className="mr-2">{loading ? 'Saving...' : 'Save'}</Button>
                    <Button type="button" onClick={handlePressCancel} disabled={loading} color="secondary">Cancel</Button>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

CreateUser.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default CreateUser;
