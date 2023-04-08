import  React,  {useEffect, useState} from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography, CardActions, Button, Avatar, CardHeader, IconButton, TextField } from '@mui/material';
import { red } from '@mui/material/colors';


import { getDatabase, onValue, push, ref } from 'firebase/database';
import { Task } from '../types';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AddTask() {
    let [text, setText] = useState<string>("");
    
    const handleTextchange = (text: string) => {
        setText(text);
    }

    const addTask = () => {
        const db = getDatabase();
        const tasksRef = ref(db, 'tasks');
        push(tasksRef, {name: text, status: "To-Do", startDate:"", endDate:"" } as Task).then(() => {setText("")});
    }
    return (
        <Grid item xs={4} sm={4} md={4} key={1}>
            <Card sx={{ minWidth: 275 }} variant="outlined">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            A
                        </Avatar>
                    }
                    title="Add a new task"
                    subheader=""
                />
                <CardContent>
                    <TextField fullWidth label="description" id="fullWidth" value={text} onChange={(e) => handleTextchange(e.target.value)} />
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={addTask}>Add</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}