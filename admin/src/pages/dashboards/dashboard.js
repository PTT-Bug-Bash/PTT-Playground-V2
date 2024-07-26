// import node modules
import { useState } from 'react';

// import components
import StaffDashboard from './staff_dashboard';
import AthleteDashboard from './athlete_dashboard';
import BusinessDashboard from './brand_dashboard';
import Login from '../login';

// import style
import "../../assets/style/index.css"

function determineDashboard(user) {
    switch (user.role.toLowerCase()) {
        case 'staff':
            return <StaffDashboard user={ user }/>
        case 'athlete':
            return <AthleteDashboard user={ user }/>
        case 'brand':
            return <BusinessDashboard user={ user }/>
        default:
            return <StaffDashboard user={ user }/>
    }
}

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false)

    const authenticate = (user) => {
        setAuthenticated(true);
        setUser(user);
    }

    return (
        <div className="App">
            {
                isAuthenticated ? determineDashboard(user) : <Login authenticate={ authenticate } />
            }  
        </div>
    )
} 