import React, {useEffect, useState} from 'react';
import './App.css';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Card, CardContent, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


type HistoryItem = {
    date: Date
    resultWeight: number,
}

function App() {

    const [name, setName] = useState('');
    const [initialWeight, setInitialWeight] = useState(0);
    const [currentWeight, setCurrentWeight] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [daysPassed, setDaysPassed] = useState<number | null>(null);

    const [resultWeight, setResultWeight] = useState(0);
    const [show, setShow] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    const result = `${name} за ${daysPassed}  дней, вы сбросили ${resultWeight}% своего веса`

    function calculateWeightLossPercentage(init: number, current: number) {
        const weightLoss = init - current;
        const weightLossPercentage = Math.floor((weightLoss / init) * 100);
        return weightLossPercentage;
    }

    const deleteHistoryItem = (index: number) => {
        const newHistory = [...history];
        newHistory.splice(index, 1);
        setHistory(newHistory);
    };

    useEffect(() => {
        const pastDate = new Date(startDate);
        const today = new Date();
        const differenceInTime = today.getTime() - pastDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        setDaysPassed(differenceInDays);
    }, [startDate]);

    const onClickHandler = () => {
        setShow(true);
        setResultWeight(calculateWeightLossPercentage(initialWeight, currentWeight));

        const newHistoryItem: HistoryItem = {
            date: new Date(),
            resultWeight: resultWeight,
        };
        const newHistory = [...history, newHistoryItem];
        setHistory(newHistory);
    };


    console.log(daysPassed)
    console.log(startDate)
    return (

        <>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>


                <TextField
                    helperText="Пожалуйста введите свое имя"
                    id="demo-helper-text-aligned"
                    label="ИМЯ"
                    color="warning"
                    sx={{m: 10, width: '25ch', p: '10px'}}
                    focused
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    label="НАЧАЛЬНЫЙ ВЕС"
                    id="outlined-start-adornment"
                    sx={{m: 10, width: '15ch', p: '10px'}}
                    color="warning"
                    focused
                    onChange={(e) => setInitialWeight(Number(e.target.value))}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        },
                    }}
                />
                <TextField
                    label="АКТУАЛЬНЫЙ ВЕС"
                    id="outlined-start-adornment"
                    sx={{m: 10, width: '15ch', p: '10px'}}
                    color="warning"
                    focused
                    onChange={(e) => setCurrentWeight(Number(e.target.value))}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                        },
                    }}
                />

                <TextField
                    id="standard-password-input"
                    label="НАЧАЛЬНАЯ ДАТА"
                    type="date"
                    autoComplete="current-password"
                    sx={{m: 10, width: '15ch', p: '10px'}}
                    color="warning"
                    onChange={(e) => setStartDate(e.target.value)}
                    focused
                />

            </Box>

            <Button
                sx={{m: 10, width: '15ch', p: '10px'}}
                variant="contained"
            onClick={onClickHandler}
            >
                Ввод
            </Button>

            {show && (<Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Результат
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {result}
                        </Typography>
                    </CardContent>
                </Card>)}

            <Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        История вводов
                    </Typography>
                    <List>
                        {history.map((el,i) => (
                            <ListItem
                                key={i}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteHistoryItem(i)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText sx={{border: "2px solid orange", borderRadius: "5px"}} primary={`${el.date}: ${el.resultWeight}`} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>

        </>
    )
}

export default App;
