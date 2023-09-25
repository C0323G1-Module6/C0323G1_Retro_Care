import React from "react";
import * as appUserService from '../../services/user/AppUserService';
import { Navigate, Outlet } from 'react-router-dom';



// COMPONENT AUTHORIZATION
const AuthorOfCustomer = ({ allowedRoles }) => {
  const roleAdmin = appUserService.checkRoleAppUser("ROLE_ADMIN");
  const roleManager = appUserService.checkRoleAppUser("ROLE_MANAGER");
  const roleEmployee = appUserService.checkRoleAppUser("ROLE_EMPLOYEE");

  const infoUser = appUserService.infoAppUserByJwtToken();


  let roles;
  if (infoUser) {
    roles = infoUser.roleList;
  }

  return roles && (roleAdmin || roleManager || roleEmployee)  ? (
    <Outlet />
  ) : <Navigate to={`/403`} />

}

export default AuthorOfCustomer;