export interface SummarizeProps {
    setSummary: (newSummary: string) => void;
    setTyping: (typingStats: boolean) => void;
    isTyping: boolean;
}
export interface SummaryBodyProps {
    content: string;
    setTyping: (typingStats: boolean) => void;
}
