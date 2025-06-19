import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import AdminList from "./components/AdminPage";

const AdminListPage: React.FC = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    return (<Box>
        <AdminList/>

    </Box>);
};

export default AdminListPage;
