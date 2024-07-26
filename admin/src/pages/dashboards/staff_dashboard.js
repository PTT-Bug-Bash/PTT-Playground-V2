import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { IconButton, Toolbar, Typography, Container, Box, Menu, MenuItem, Button, Tooltip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Import components
import Athletes from '../../components/Athlete/Athletes';
import Brands from '../../components/Brand/Brands';
import OpportunityBoard from '../../components/Opportunities/OpportunityBoard';
import UserManagement from '../../components/User/UserManagement';
import SendEmail from '../../components/User/SendEmail';
import OpportunityForm from '../../components/Opportunities/forms/OpportunityForm';
import Map from '../map';

// Import logo
import logoImage from '../../assets/logo.png';

const pages = ['Athletes', 'Brands', 'Opportunities', 'Map', 'Grafana', 'Send Email', 'Manage Users', 'Add Opportunity'];
const settings = ['Profile','Logout'];

export default function StaffDashboard(props) {
    const { user } = props;
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);

    // State for displaying different components
    const [displayAthletes, setDisplayAthletes] = useState(false);
    const [displayBrands, setDisplayBrands] = useState(false);
    const [displayOpportunities, setDisplayOpportunities] = useState(false);
    const [displaySendEmail, setDisplaySendEmail] = useState(false);
    const [displayUserManagement, setDisplayUserManagement] = useState(false);
    const [displayOpportunityForm, setDisplayOpportunityForm] = useState(false);
    const [displayMap, setDisplayMap] = useState(false);

    const resetDisplays = () => {
        setDisplayAthletes(false);
        setDisplayBrands(false);
        setDisplayOpportunities(false);
        setDisplaySendEmail(false);
        setDisplayUserManagement(false);
        setDisplayOpportunityForm(false);
        setDisplayMap(false);
    };

    const displayPage = (page) => {
        resetDisplays();
        switch (page) {
            case 'Athletes':
                setDisplayAthletes(true);
                break;
            case 'Brands':
                setDisplayBrands(true);
                break;
            case 'Opportunities':
                setDisplayOpportunities(true);
                break;
            case 'Map':
                setDisplayMap(true);
                break;
            case 'Grafana':
                window.open('https://analytics.athletereserve.com:3000/', '_blank');
                break;
            case 'Send Email':
                setDisplaySendEmail(true);
                break;
            case 'Manage Users':
                setDisplayUserManagement(true);
                break;
            case 'Add Opportunity':
                setDisplayOpportunityForm(true);
                break;
            default:
                console.log(`Unhandled page type: ${page}`);
                break;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleProfileDialog = () => {
        setProfileDialogOpen(!profileDialogOpen);
    };

    return (
        <div>
            <AppBar position="static" sx={{ bgcolor: "black" }}>
                <Container maxWidth="x1">
                    <Toolbar disableGutters>
                        <Typography variant="h6" noWrap sx={{
                            mr: 2, display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3em',
                            color: 'inherit', textDecoration: 'none',
                        }}>
                            <img src={logoImage} alt="Company Logo" style={{ width: '150px' }} />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton size="large" aria-label="account of current user"
                                aria-controls="menu-appbar" aria-haspopup="true"
                                onClick={handleOpenNavMenu} color="inherit">
                                <MenuIcon />
                            </IconButton>
                            <Menu id="menu-appbar" anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}>
                                {pages.map((page) => (
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
                            {pages.map((page) => (
                                <Button key={page} onClick={() => {
                                    handleCloseNavMenu();
                                    displayPage(page);
                                }} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" />
                                </IconButton>
                            </Tooltip>
                            <Menu sx={{ mt: '45px' }} id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => {
                                        handleCloseUserMenu();
                                        if (setting === 'Profile') {
                                            toggleProfileDialog();
                                        } else if (setting === 'Logout') {
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
            <Dialog open={profileDialogOpen} onClose={toggleProfileDialog}>
                <DialogTitle>User Profile</DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="Email" secondary={user.email} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Role" secondary={user.role} />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleProfileDialog}>OK</Button>
                </DialogActions>
            </Dialog>

         
            {displayAthletes ? <Athletes /> : null}
            {displayBrands ? <Brands /> : null}
            {displayOpportunities ? <OpportunityBoard userType={user.role} entityID={user.entity_id} /> : null}
            {displayMap ? <Map userType={user.role} entityId={user.entity_id} /> : null }
            {displaySendEmail ? <SendEmail /> : null}
            {displayUserManagement ? <UserManagement /> : null}
            {displayOpportunityForm ? <OpportunityForm  brandID={user.entity_id} userType={user.role}/> : null}
        </div>
    );
}
