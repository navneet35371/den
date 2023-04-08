import { Grid, Card, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions, Button, Menu, MenuItem } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { Task } from '../types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getDatabase, ref, remove, update } from "firebase/database";

export default function TaskCard(props: any) {
    const { task } = props;
    const handleDelete = (id: string) => {
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks/' + id);
        remove(tasksRef);
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const updateTask = (taskId: string, status: string) => {
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks/' + taskId);
        update(tasksRef, { status: status});
    }
    return (
        <Grid item xs={4} sm={4} md={4} key={task.id}>
            <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Navneet"
                    subheader={task.status}
                />
                <CardContent>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {task.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => handleDelete(task.id)}>Delete</Button>
                </CardActions>
            </Card>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => updateTask(task.id, "In-Progress")}>Mark as In-Progress</MenuItem>
                <MenuItem onClick={() => updateTask(task.id, "Done")}>Mark as Done</MenuItem>
            </Menu>
        </Grid>


    );

}
