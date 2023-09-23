import React from "react";
import * as appUserService from '../../services/user/AppUserService';
import jwt_decoce from 'jwt-decode';
import { useLocation, Navigate, Outlet } from 'react-router-dom'



const hasValueInAuthorProperty = (allowedRoles, currentRoles) => {
    for (let i = 0; i < allowedRoles.length; i++) {
      const valueToCheck = allowedRoles[i];
      for (let j = 0; j < currentRoles.length; j++) {
        const obj = currentRoles[j];
        if (obj.authority === valueToCheck) {
          return true;
        }
      }
    }
    return false;
}

const Authorization = ({allowedRoles}) => {
    const location = useLocation()

    const infoUser = appUserService.infoAppUserByJwtToken();

    let roles;
    if(infoUser){
        roles = infoUser.roleList;
    }
    
    return roles && hasValueInAuthorProperty(allowedRoles,roles) ? (
        <Outlet/>
    ) : <Navigate to={`/home`}/>
       

}

export default Authorization;