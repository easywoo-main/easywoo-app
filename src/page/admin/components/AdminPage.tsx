import React, {useEffect, useState} from "react";
import {PageRequestArgs, PageResponse} from "../../../utils/pageable.utils";
import Pagination from "../../../components/Pagionation";
import {getPaginationChat} from "../../../api/chat.service";
import {Chat} from "../../../type/chat.type";
import {Admin} from "../../../type/auth.type";
import AdminItem from "./AdminItem";
import {getAllAdmins} from "../../../api/admin.service";
import {getAllRoles} from "../../../api/role.service";
import { Role } from "../../../type/role.type";
import CreateAdminModal from "./CreateAdminModal";
import {Box, Button, Typography} from "@mui/material";

const AdminList: React.FC = () => {
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);
    const fetchAdmins = (pageRequest: PageRequestArgs): Promise<PageResponse<Admin>> => {
        return getAllAdmins(pageRequest);
    };

    useEffect(() => {
        getAllRoles().then(setRoles);
    }, []);
    return (
        <>
            <Box p={3} >
                <Typography variant="h4">Admin List</Typography>
                <Button
                    onClick={() => setIsOpenCreateModal(true)}
                    variant="contained"
                    color="primary"
                    sx={{mt: 2, mb: 2}}
                >
                    Create Admin
                </Button>
            </Box>

            <Pagination
            fetchData={fetchAdmins}
            render={(admin: Admin, onRefresh: () => void) => (
                <AdminItem originAdmin={admin} roles={roles} onRefresh={onRefresh}/>
            )}
        />
            {isOpenCreateModal && <CreateAdminModal onClose={()=> setIsOpenCreateModal(false)} onSave={()=>{}} roles={roles}/>}
            </>
    );
};

export default AdminList;