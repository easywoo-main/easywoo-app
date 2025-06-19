import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {createAdmin} from "../../../api/admin.service";
import {Admin} from "../../../type/auth.type";
import {Role} from "../../../type/role.type";
import {
    Box, Button, Dialog, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface CreateAdminModalProps {
    roles: Role[]
    onSave: (data: Admin) => void;
    onClose: () => void;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({roles, onClose, onSave}) => {
    const {control, handleSubmit} = useForm({
        defaultValues: {
            userName: "", password: "", roleId: roles[0]?.id,
        },
    });


    const [showPassword, setShowPassword] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSave = async (data: any) => {
        setSaving(true);
        try {
            const newAdmin = await createAdmin(data)
            onSave(newAdmin);
            onClose()
        } finally {
            setSaving(false);
        }
    };

    return (
        <Dialog open onClose={onClose}>

    <form onSubmit={handleSubmit(handleSave)}>

                <Box sx={{display: "flex", flexDirection: "column", gap: 2, width: 300, margin: "15px"}}>
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
                    <Button onClick={onClose} color="secondary">Cancel</Button>
                    <Button type="submit" variant="contained" color="primary" disabled={saving}>
                        {saving ? "Saved..." : "Save"}
                    </Button>
                </Box>
            </form>
        </Dialog>)
}

export default CreateAdminModal;