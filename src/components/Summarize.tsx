import { Button } from '@mui/material';
import { summarize } from '../api/jigsawStack';
import { SummarizeProps } from '../types/component';
import LoopIcon from '@mui/icons-material/Loop';
export default function Summarize({
    setSummary,
    setTyping,
    isTyping,
}: SummarizeProps) {
    const onButtonClick = () => {
        setTyping(true);
        chrome.runtime.sendMessage(
            { action: 'fetchContent' },
            async (response) => {
                const summary = await summarize({ content: response.content });
                setSummary(summary?.summary);
            },
        );
    };
    return (
        <Button
            variant="contained"
            sx={{
                background: '#2196F3',
                borderRadius: '20px',
            }}
            disabled={isTyping}
            onClick={onButtonClick}
            startIcon={isTyping ? <LoopIcon className="loading-icon" /> : null}
        >
            Summarize!
        </Button>
    );
}
