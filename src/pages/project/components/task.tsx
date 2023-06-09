import { Grid, Card, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions, Button, Menu, MenuItem, TextField, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { Task } from '../types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getDatabase, ref, remove, update } from "firebase/database";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { HexColorPicker } from "react-colorful";

export default function TaskCard(props: any) {
    const { task } = props;
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [taskDescription, setTaskDescription] = React.useState(task.name);
    const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(task.startDat));
    const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(task.endDate));
    const taskColor = task.color ? task.color : "#fff"
    const [color, setColor] = useState(taskColor);

    const [openDialog, setOpenDialog] = useState(false);
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
        update(tasksRef, { status: status });
    }

    const updateDescription = (taskId: string, description: string) => {
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks/' + taskId);
        update(tasksRef, { name: description, startDate: dayjs(startDate).toDate(), endDate: dayjs(endDate).toDate()});
    }

    const updateStartDate = (taskId: string, value: Date|null) => {
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks/' + taskId);
        update(tasksRef, { startDate: value });
    }
    
    const updateEndDate = (taskId: string, value: Date|null) => {
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks/' + taskId);
        update(tasksRef, { endDate: value });
    }

    const handleTextchange = (value: string) => {
        setTaskDescription(value);
    }

    const handleDialogClose = (color:string) => {
        setOpenDialog(false);
        setColor(color);
    }

    const updateColor = (color: string) => {
        const taskId = task.id;
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks/' + taskId);
        update(tasksRef, { color: color });
    }

    useEffect(() => {
        updateColor(color);
    }, [color])

    const SimpleDialog = (props : any) => {
        const { onClose, open } = props;
        const [color, setColor] = useState("#fff");
      
        // const handleClose = () => {
        //   onClose(color);
        // };

        // useEffect(() => {
        //     onClose(color);
        // },[color])
      
        const handleListItemClick = (value: string) => {
          onClose(color);
        };
      
        return (
          <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set color for task</DialogTitle>
            <DialogContent>
                <HexColorPicker color={color} onChange={setColor} onClick={() => handleListItemClick(color)}/>
            </DialogContent>  
          </Dialog>
        );
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
                <CardContent  style={{backgroundColor:task.color}}>
                    {!isUpdate && <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {task.name && <span>Descriptiion: {task.name}</span>}   
                        {task.startDate && <div>Start Date: {dayjs(task.startDate).format('DD/MM/YYYY')}</div>}
                        {task.endDate && <div>End Date: {dayjs(task.endDate).format('DD/MM/YYYY')}</div>}
                    </Typography>}
                    {isUpdate &&
                        <>
                            <TextField fullWidth label="description" value={taskDescription} onChange={(e) => handleTextchange(e.target.value)} />
                            <DatePicker label="Start Date"
                                value={startDate}
                                onChange={(newValue) => {setStartDate(newValue)}} />
                            <DatePicker label="End date"
                                value={endDate}
                                onChange={(newValue) => {setEndDate(newValue)}} />
                        </>}
                        <SimpleDialog
                            selectedValue={color}
                            open={openDialog}
                            onClose={handleDialogClose}
                            />
                </CardContent>
                <CardActions>
                    {isUpdate && <Button size="small" onClick={() => { updateDescription(task.id, taskDescription); setIsUpdate(!isUpdate) }}>Update</Button>}
                    {!isUpdate && <Button size="small" onClick={() => setIsUpdate(!isUpdate)}>Edit</Button>}
                    <Button size="small" onClick={() => handleDelete(task.id)}>Delete</Button>
                    <Button size="small" onClick={() => setOpenDialog(true)}>Update Color</Button> 
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
                <MenuItem onClick={() => updateTask(task.id, "To-Do")}>Mark as To-Do</MenuItem>
                <MenuItem onClick={() => updateTask(task.id, "In-Progress")}>Mark as In-Progress</MenuItem>
                <MenuItem onClick={() => updateTask(task.id, "Done")}>Mark as Done</MenuItem>
            </Menu>
        </Grid>


    );

}
