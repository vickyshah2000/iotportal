import React from 'react'
import Cookies from "js-cookie";
import PuduLandingPage from './PuduLandingPage';
import BelagaviLandingPage from './BelagaviLandingPage';
import DefaultLandingPage from './DefaultLandingPage';
function LandingDashboard() {
    const userCookie = Cookies.get("authUser");
    const entityId = userCookie ? JSON.parse(userCookie).entity_id.entity_id : null;
    return (
        <>
        <div>
        {entityId===1?<BelagaviLandingPage/>:entityId===2?<PuduLandingPage />:<DefaultLandingPage/>}
        </div>
        </>
    )
}

export default LandingDashboard;