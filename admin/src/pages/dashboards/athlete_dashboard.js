// import node modules
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography, Container, Box, Menu, MenuItem, Button, Tooltip, Avatar } from '@mui/material';

// import routes
import getAthlete from '../../routes/athlete/getAthlete';
import getUser from '../../routes/user/getUser';

// import components
import AthleteForm from '../../components/Athlete/forms/AthleteForm';
import AddAthleteForm from '../../components/Athlete/forms/AddAthleteForm';
import AthleteProfileForm from '../../components/Athlete/forms/AthleteProfileForm';
import AthleteDealPreferencesForm from '../../components/Athlete/forms/AthleteDealPreferencesForm';
import AthleteLocationsForm from '../../components/Athlete/forms/AthleteLocationsForm';
import OpportunityBoard from '../../components/Opportunities/OpportunityBoard';
import Map from '../map';

// import logo
import logoImage from '../../assets/logo.png';

const pages = { 'Details': 0, 'Profile': 1, 'Preferences': 2, 'Locations': 3, "Opportunities": 4, "Map": 5 };
const settings = { 'Logout': 0 };

export default function AthleteDashboard(props) {
    const { user } = props;

    const [data, setData] = useState(null);
    const [userData, setUser] = useState(user);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [displayPageX, setDisplayPageX] = useState(0);

    const refreshUser = () => {
        getUser(user).then((user) => { setUser(user) });
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const displayPage = (page) => {
        setDisplayPageX(pages[page]);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

   // get athlete from user properties from API
    async function fetchData() {
        try {
            const athlete = await getAthlete(userData.entity_id);
            setData(athlete);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    
    // eslint-disable-next-line
    }, [userData.entity_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading Athlete: {error.message}</div>;
    }

    if (data) {
        return (
            <div style={{ flexDirection: "column", justifyContent: "center" }}>
                <AppBar position="static" sx={{ bgcolor: "black" }}>
                    <Container maxWidth="x1">
                        <Toolbar disableGutters>
                            <Typography variant="h6" noWrap sx={{
                                mr: 2, display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace', fontWeight: 700,
                                letterSpacing: '.3em', color: 'inherit', textDecoration: 'none',
                            }}>
                                <img src={logoImage} alt="Company Logo" style={{ width: '150px' }} />
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' }
                                    }}
                                >
                                    {
                                        Object.keys(pages).map((key) => (
                                            <MenuItem key={key} onClick={() => {
                                                handleCloseNavMenu();
                                                displayPage(key);
                                            }}>
                                                <Typography textAlign="center">{key}</Typography>
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {
                                    Object.keys(pages).map((page) => (
                                        <Button
                                            key={page}
                                            onClick={() => {
                                                handleCloseNavMenu();
                                                displayPage(page);
                                            }}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            {page}
                                        </Button>
                                    ))
                                }
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Test" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {
                                        Object.keys(settings).map((setting) => (
                                            <MenuItem key={setting} onClick={() => {
                                                handleCloseUserMenu();
                                                if (setting === 'Logout') {
                                                    handleLogout();
                                                }
                                            }}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </Box>
                        </Toolbar>
                        </Container>
                </AppBar>
                <div class="container-body">
                    <Box sx={{ 
                        backgroundColor: "white", 
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        {displayPageX === 0 ? (
                            <div 
                                sx={{ backgroundColor: 'white'}}
                                role="tabpanel"
                                id="athlete-details"
                                aria-labelledby="athlete-details"
                            >
                                { data.id === undefined ? 
                                    <AddAthleteForm user={userData} onSubmit={() => {
                                        window.alert("Athlete details created");
                                        refreshUser();
                                    }} />    
                                    : <AthleteForm user={userData} athlete={data} onSubmit={() => window.alert("Athlete details updated")} />
                                }
                            </div>
                        ) : null}
                        {displayPageX === 1 ? (
                            <div 
                                role="tabpanel"
                                id="athlete-profile"
                                aria-labelledby="athlete-profile"
                            >
                                { data.id === undefined ?
                                    <div>No entityID for user currently exists. Please save details first.</div>
                                    : <AthleteProfileForm athlete_id={data.id} onSubmit={() => {}} />
                                }
                            </div>
                        ) : null}
                        {displayPageX === 2 ? (
                            <div 
                                role="tabpanel"
                                id="athlete-deal-preferences"
                                aria-labelledby="athlete-deal-preferences"
                            >
                                <AthleteDealPreferencesForm athlete_id={data.id} onSubmit={() => {}} />
                            </div>
                        ) : null}
                        {displayPageX === 3 ? (
                            <div 
                                role="tabpanel"
                                id="athlete-locations"
                                aria-labelledby="athlete-locations"
                            >
                                <AthleteLocationsForm athlete_id={data.id} onSubmit={() => {}} />
                            </div>
                        ) : null}
                    </Box>
                    {displayPageX === 4 ? 
                        <OpportunityBoard userType={userData.role} entityID={userData.entity_id} />
                        : null
                    }
                </div>
                {displayPageX === 5 ? 
                    (data.id === undefined || data.id === null) ?
                        <div class="container-body">No entityID for user currently exists. Please save details first.</div>
                        : <Map entityID={data.id} />
                    : null
                }                
            </div>
        );
    } else {
        return <div>No data to display</div>;
    }
}

