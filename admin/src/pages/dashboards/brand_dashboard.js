// Import node modules
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Toolbar, Typography, Container, Box, Menu, MenuItem, Button, Tooltip, Avatar } from '@mui/material';

// import routes
import getBrand from "../../routes/business/getBrand";
import getUser from "../../routes/user/getUser";

// Import components
import BusinessForm from '../../components/Brand/forms/BusinessForm';
import AddBrandForm from '../../components/Brand/forms/AddBrandForm';
import BrandProfileForm from '../../components/Brand/forms/BrandProfileForm';
import BrandDealsForm from '../../components/Brand/forms/BrandDealsForm';
import OpportunityBoard from '../../components/Opportunities/OpportunityBoard';
import OpportunityForm from '../../components/Opportunities/forms/OpportunityForm';

// import logo
import logoImage from '../../assets/logo.png';

const pages = { 'Details': 0, 'Profile': 1, "Preferences": 2, "Opportunities": 3 , "Add Opportunity": 4 };
const settings = { 'Logout': 0 };

export default function BrandDashboard(props) {
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
        setDisplayPageX(pages[page])
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

    // get brand from user properties from API
    async function fetchData() {
        try {
            const brand = await getBrand(userData.entity_id);
            setData(brand);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line
    }, [userData.entity_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading Brand: {error.message}</div>;
    }

    if (data) {
        return (
            <div style={{
                flexDirection: "column",
                justifyContent: "center"
            }}>
                <AppBar position="static" sx={{ bgcolor: "black" }}>
                    <Container maxWidth="x1">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3em',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
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
                                >
                                    {Object.keys(pages).map((page) => (
                                        <MenuItem key={page} onClick={() => {
                                            handleCloseNavMenu();
                                            displayPage(page);
                                        }}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {Object.keys(pages).map((page) => (
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
                                ))}
                            </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="User Avatar" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-user"
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
                                    {Object.keys(settings).map((setting) => (
                                        <MenuItem key={setting} onClick={() => {
                                            handleCloseUserMenu();
                                            if (setting === 'Logout') {
                                                handleLogout();
                                            }
                                        }}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            </Toolbar>
                    </Container>
                </AppBar>
                <div class="container-body">
                    <Box sx={{ 
                        backgroundColor: 'white', 
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        { displayPageX === 0 ?
                            <div 
                                sx={{ backgroundColor: 'white' }}
                                role="tabpanel"
                                id="brand-details"
                                aria-labelledby="brand-details"
                            >
                                { data.id === undefined ?
                                    <AddBrandForm user={userData} onSubmit={() => {
                                        window.alert("Brand details created");
                                        refreshUser();
                                    }} />
                                    : <BusinessForm user={userData} business={data} onSubmit={() => {}} />
                                }
                            </div>
                            : null
                        }
                        { displayPageX === 1 ?
                            <div 
                                sx={{ backgroundColor: 'white' }}
                                role="tabpanel"
                                id="brand-profile"
                                aria-labelledby="brand-profile"
                            >
                                { data.id === undefined ?
                                    <div>No entityID for user currently exists. Please save details first.</div>
                                    : <BrandProfileForm brand_id={data.id} onSubmit={() => {}} />
                                }
                            </div>
                            : null
                        }
                        { displayPageX === 2 ?
                            <div 
                                sx={{ backgroundColor: 'white' }}
                                role="tabpanel"
                                id="brand-deals"
                                aria-labelledby="brand-deals"
                            >
                                <BrandDealsForm brand_id={data.id} onSubmit={() => window.alert("Brand deals updated")} />
                            </div>
                            : null
                        }
                    </Box>
                    { displayPageX === 3 ?
                        <OpportunityBoard userType={userData.role} entityID={userData.entity_id} />
                        : null 
                    }
                    { displayPageX === 4 ?
                        (data.id === undefined || data.id === null) ?
                            <div class="container-body">No entityID for user currently exists. Please save details first.</div>
                            : <OpportunityForm brandID={userData.entity_id} userType={userData.role} />
                        : null
                    }
                </div>
            </div>
        );
    } 
}

