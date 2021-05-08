import React from 'react';

const UserManagement = React.lazy(() => import('./views/UserManagement'))
const CreateUser = React.lazy(() => import('./views/UserManagement/CreateUser'))

const routes = [
  { path: '/user/create', exact: true, name: 'Create User', component: CreateUser },
  { path: '/user/edit/:userId', exact: true, name: 'Edit User', component: CreateUser },
  { path: '/user', exact: true, name: 'User Management', component: UserManagement },
  { path: '/', exact: true, name: 'Home' },
];

export default routes;
