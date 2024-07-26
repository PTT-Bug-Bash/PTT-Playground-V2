import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, AppBar, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, FormControl, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import { api_url, api_key } from "../../url";


export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [initialUsers, setInitialUsers] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [updateInProgress, setUpdateInProgress] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${api_url}/api/users`, {
                headers: {
                    "x-api-key": api_key
                },
                params: { sortByVerified: 'true' }
            });
            setUsers(response.data);
            setInitialUsers(response.data.reduce((acc, user) => ({ ...acc, [user.id]: { ...user } }), {}));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleInputChange = (event, id, field) => {
        const newUsers = users.map(user => user.id === id ? {...user, [field]: event.target.value} : user);
        setUsers(newUsers);
    };

    const handleUpdate = async (user) => {
        if (updateInProgress) {
          setSnackbar({ open: true, message: 'Please complete the current update before starting another.', severity: 'warning' });
          return;
        }
        if (window.confirm("Are you sure you want to save the changes?")) {
          setUpdateInProgress(true);
          if (hasChanged(user)) {
            try {
              await axios.put(`${api_url}/api/users/${user.id}`, user, {
                headers: { "x-api-key": api_key }
              });
              setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
              fetchUsers();
            } catch (error) {
              console.error("Error updating user:", error);
              setSnackbar({ open: true, message: 'Error updating user', severity: 'error' });
            }
          }
          setUpdateInProgress(false);
        }
      };

      const handleRoleChange = async (event, user) => {
        const newRole = event.target.value;
        if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            const updatedUser = { ...user, role: newRole };
            if (updateInProgress) {
                setSnackbar({ open: true, message: 'Please complete the current update before starting another.', severity: 'warning' });
                return;
            }
            setUpdateInProgress(true);
            try {
                await axios.put(`${api_url}/api/users/${user.id}`, updatedUser, {
                    headers: { "x-api-key": api_key }
                });
                setSnackbar({ open: true, message: 'Role updated successfully', severity: 'success' });
                fetchUsers();  // Refresh users to reflect the change
            } catch (error) {
                console.error("Error updating user role:", error);
                setSnackbar({ open: true, message: 'Error updating user role', severity: 'error' });
            } finally {
                setUpdateInProgress(false);
            }
        }
    };
    const calculateTimeSinceRegistration = (createdTime) => {
        const now = new Date();
      const createdDate = new Date(createdTime);
       const difference = now - createdDate; // difference in milliseconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
       const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
       const minutes = Math.floor((difference / (1000 * 60)) % 60);
       return `${days} days, ${hours} hours, ${minutes} minutes`;
    };
    const deleteUser = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
          try {
            await axios.delete(`${api_url}/api/users/${userId}`, {
              headers: { "x-api-key": api_key }
            });
            setUsers(users.filter(user => user.id !== userId));
            setSnackbar({ open: true, message: 'User deleted successfully', severity: 'success' });
          } catch (error) {
            console.error("Error deleting user:", error);
            setSnackbar({ open: true, message: 'Error deleting user', severity: 'error' });
          }
        }
      };
    const hasChanged = (user) => {
        const originalUser = initialUsers[user.id];
        return !originalUser ||
               user.first_name !== originalUser.first_name ||
               user.last_name !== originalUser.last_name ||
               user.email !== originalUser.email ||
               user.role !== originalUser.role;
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        User Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow sx={{ 'th': { border: 1, borderColor: 'black', backgroundColor: 'gray', color: 'white', fontWeight: 'bold' } }}>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Update</TableCell>
                                <TableCell>Created Time</TableCell>
                                <TableCell>Access Level</TableCell>
                                <TableCell>Change Access Level</TableCell>
                                <TableCell>Email Verified</TableCell>
                                <TableCell>Registered but Not Verified</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} sx={{ 'td': { border: 1, borderColor: 'black', py: 0.5 } }}>  
                                <TableCell sx={{ fontSize: '0.75rem', lineHeight: 1.25, minWidth: 50 }}>{user.id}</TableCell>
                                <TableCell sx={{ py: 0.5, minWidth: 100 }}>
                                    <TextField
                                        value={user.first_name}
                                        onChange={(e) => handleInputChange(e, user.id, 'first_name')}
                                        size="small"  
                                        fullWidth
                                        InputProps={{
                                            style: { height: '100%' }
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.5, minWidth: 100 }}>
                                    <TextField
                                        value={user.last_name}
                                        onChange={(e) => handleInputChange(e, user.id, 'last_name')}
                                        size="small"  
                                        fullWidth
                                        InputProps={{
                                            style: { height: '100%' }
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.5, minWidth: 200 }}>
                                    <TextField
                                        value={user.email}
                                        onChange={(e) => handleInputChange(e, user.id, 'email')}
                                        size="small"
                                        fullWidth
                                        InputProps={{
                                            style: { height: '100%' }
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 0.5, minWidth: 50 }}>
                                    <IconButton onClick={() => handleUpdate(user)}>
                                        <SaveIcon sx={{ color: 'blue' }} />
                                    </IconButton>
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.875rem', lineHeight: 1.25, minWidth: 150 }}>{user.createdtime}</TableCell>
                                <TableCell sx={{ fontSize: '0.875rem', lineHeight: 1.25, minWidth: 100 }}>{user.role}</TableCell>
                                <TableCell sx={{ py: 0.5, minWidth: 150 }}>
                                    <FormControl fullWidth>
                                        <Select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(e, user)}
                                            size="small"  
                                        >
                                            <MenuItem value="Athlete">Athlete</MenuItem>
                                            <MenuItem value="Staff">Staff</MenuItem>
                                            <MenuItem value="Brand">Brand</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.875rem', lineHeight: 1.25, minWidth: 100 }}>{user.emailverified ? 'Yes' : 'No'}</TableCell>
                                <TableCell sx={{ fontSize: '0.875rem', lineHeight: 1.25, minWidth: 150 }}>
                                    {!user.emailverified ? calculateTimeSinceRegistration(user.createdtime) : ''}
                                </TableCell>
                                <TableCell sx={{ py: 0.5, minWidth: 50 }}>
                                    <IconButton onClick={() => deleteUser(user.id)}>
                                        <DeleteIcon sx={{ color: 'red' }} />
                                    </IconButton>
                                </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                    </Table>
                    </TableContainer>
            </Container>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
