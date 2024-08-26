import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Typed from 'typed.js';
import { SummaryBodyProps } from '../types/component';

function Summary({ content, setTyping }: SummaryBodyProps) {
    const el = React.useRef(null);
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [content],
            typeSpeed: 5,
            onComplete: () => {
                setTyping(false);
            },
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, [content]);
    return (
        <Typography
            className="summary-body"
            variant="body1"
            ref={el}
        ></Typography>
    );
}

export default Summary;
