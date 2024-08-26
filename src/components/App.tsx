import React, { useState } from 'react';
import '../styles/App.css';
import { Box, Card, Typography } from '@mui/material';
import Summarize from './Summarize';
import Summary from './Summarybody';

function App() {
    const [content, setContent] = useState('');
    const [typing, setTyping] = useState(false);
    return (
        <div className="App">
            <Card
                variant="outlined"
                className="card-greeting"
                sx={{ border: '2px solid #2196F3', borderRadius: '20px' }}
            >
                <Box
                    display="flex"
                    flexDirection="row" // or "column"
                    alignItems="center" // aligns items vertically
                    alignContent="center"
                    height="100%"
                    justifyContent="space-around"
                    sx={{ marginTop: '20px', marginBottom: '20px' }}
                >
                    <Typography variant="h2" className="greeting">
                        Hi, Ash!
                    </Typography>
                    <Summarize
                        setSummary={setContent}
                        setTyping={setTyping}
                        isTyping={typing}
                    />
                </Box>
                <Summary content={content} setTyping={setTyping} />
            </Card>
        </div>
    );
}

export default App;
