import React, {useState} from "react";
import {
    Box, Button, Card, CardContent, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Controller, useForm, useWatch} from "react-hook-form";
import {Admin} from "../../../type/auth.type";
import {Role} from "../../../type/role.type";
import {updateAdmin} from "../../../api/admin.service";

interface AdminItemProps {
    originAdmin: Admin;
    roles: Role[];
    onRefresh: () => void;
}

type FormValues = {
    userName: string; password: string | null; roleId: string;
};

const AdminItem: React.FC<AdminItemProps> = ({originAdmin, roles, onRefresh}) => {
    const {control, handleSubmit} = useForm<FormValues>({
        defaultValues: {
            userName: originAdmin.userName, password: undefined, roleId: originAdmin.roleId,
        },
    });

    const watched = useWatch({control});

    const [showPassword, setShowPassword] = useState(false);
    const [saving, setSaving] = useState(false);
    const isChanged = watched.userName !== originAdmin.userName || watched.password || watched.roleId !== originAdmin.roleId;

    const handleSave = async (data: any) => {
        setSaving(true);
        try {
            await updateAdmin(originAdmin.id, data);
            onRefresh()
        } finally {
            setSaving(false);
        }
    };

    return (<Card variant="outlined" sx={{marginBottom: 2}}>
            <CardContent>
                <form onSubmit={handleSubmit(handleSave)}>

                    <Box sx={{display: "flex", flexDirection: "column", gap: 2, width: 300}}>
                        <Controller
                            name="userName"
                            control={control}
                            render={({field}) => <TextField label="User Name" fullWidth {...field} />}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({field}) => (<TextField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    {...field}
                                    InputProps={{
                                        endAdornment: (<InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end"
                                                            aria-label="toggle password visibility">
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>),
                                    }}
                                />)}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Controller
                                name="roleId"
                                control={control}
                                render={({field}) => (<Select labelId="role-label" label="Role" {...field}>
                                        {roles.map((role) => (<MenuItem key={role.id} value={role.id}>
                                                {role.name}
                                            </MenuItem>))}
                                    </Select>)}
                            />
                        </FormControl>


                        {isChanged && (<Button type="submit" variant="contained" color="primary" disabled={saving}>
                                {saving ? "Saved..." : "Save"}
                            </Button>)}
                    </Box>
                </form>
            </CardContent>
        </Card>);
};

export default AdminItem;

