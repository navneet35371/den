import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, CardActions, Button, Avatar, CardHeader, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Task } from './types';
import { getAllTasks } from './api';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import AddTask from './components/addtask';
import TaskCard from './components/task';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Project() {
    let [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks');

        onValue(tasksRef, (snapshot) => {
            const data = snapshot.val();
            const newTaskList: Task[] = [];

            for (let id in data) {
                newTaskList.push({ id, ...data[id] });
            };
            setTasks(newTaskList);
        });
    }, []);
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {tasks && tasks.map((task) => (
                   <TaskCard task={task} key={task.id}></TaskCard>     
                ))}
                <AddTask></AddTask>

            </Grid>
        </Box>
    );
}


