import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";

export function useHandler(value: string, onChange: (value: string) => void): [State, Handlers] {
    const [isPreview, setIsPreview] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle shortcuts when textarea is focused
            if (document.activeElement !== textareaRef.current) return;
            
            // Check if Ctrl/Cmd is pressed
            const isCtrlPressed = e.ctrlKey || e.metaKey;
            
            if (isCtrlPressed) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        formatText('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        formatText('italic');
                        break;
                    case 'k':
                        e.preventDefault();
                        formatText('link');
                        break;
                    case 'q':
                        e.preventDefault();
                        formatText('quote');
                        break;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [value]); // Re-add listener when value changes

    const insertMarkdown = (before: string, after: string = '') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        // If no text is selected, insert the markdown and place cursor between the markers
        if (start === end) {
            const newText = value.substring(0, start) + before + after + value.substring(end);
            onChange(newText);

            // Set cursor position between the markdown markers
            setTimeout(() => {
                textarea.focus();
                const newCursorPos = start + before.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        } else {
            // If text is selected, wrap it with the markdown
            const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
            onChange(newText);

            // Set cursor position after the formatted text
            setTimeout(() => {
                textarea.focus();
                const newCursorPos = start + before.length + selectedText.length + after.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }
    };

    const formatQuote = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        if (start === end) {
            // If no text is selected, just insert the quote marker
            insertMarkdown('> ');
        } else {
            // If text is selected, format each line as a quote
            const lines = selectedText.split('\n');
            const formattedLines = lines.map(line => {
                return line.trim() ? `> ${line.trim()}` : line;
            });
            
            const formattedText = formattedLines.join('\n');
            const newText = value.substring(0, start) + formattedText + value.substring(end);
            onChange(newText);

            // Set cursor position after the formatted text
            setTimeout(() => {
                textarea.focus();
                const newCursorPos = start + formattedText.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }
    };

    const formatList = (type: 'list' | 'ordered-list') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);

        if (start === end) {
            // If no text is selected, just insert the list marker
            insertMarkdown(type === 'list' ? '- ' : '1. ');
        } else {
            // If text is selected, format each line as a list item
            const lines = selectedText.split('\n');
            const formattedLines = lines.map((line, index) => {
                if (type === 'list') {
                    return line.trim() ? `- ${line.trim()}` : line;
                } else {
                    return line.trim() ? `${index + 1}. ${line.trim()}` : line;
                }
            });
            
            const formattedText = formattedLines.join('\n');
            const newText = value.substring(0, start) + formattedText + value.substring(end);
            onChange(newText);

            // Set cursor position after the formatted text
            setTimeout(() => {
                textarea.focus();
                const newCursorPos = start + formattedText.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }
    };

    const formatText = (type: string) => {
        switch (type) {
            case 'bold':
                insertMarkdown('**', '**');
                break;
            case 'italic':
                insertMarkdown('*', '*');
                break;
            case 'code':
                insertMarkdown('`', '`');
                break;
            case 'quote':
                formatQuote();
                break;
            case 'list':
                formatList('list');
                break;
            case 'ordered-list':
                formatList('ordered-list');
                break;
            case 'link':
                insertMarkdown('[', '](url)');
                break;
        }
    };

    const renderPreview = (text: string) => {
        // First, handle block-level elements (quotes, lists)
        let processedText = text
            // Handle blockquotes - convert consecutive quote lines to a single blockquote
            .replace(/^(> .*?)(?:\n(> .*?))*$/gm, (match) => {
                const lines = match.split('\n').map(line => line.replace(/^> /, ''));
                return `<blockquote class="border-l-4 border-primary pl-4 italic my-2">${lines.join('<br/>')}</blockquote>`;
            })
            // Handle unordered lists - convert consecutive list lines to a single ul
            .replace(/^(- .*?)(?:\n(- .*?))*$/gm, (match) => {
                const lines = match.split('\n').map(line => line.replace(/^- /, ''));
                const listItems = lines.map(line => `<li>${line}</li>`).join('');
                return `<ul class="list-disc list-inside my-2">${listItems}</ul>`;
            })
            // Handle ordered lists - convert consecutive numbered lines to a single ol
            .replace(/^(\d+\. .*?)(?:\n(\d+\. .*?))*$/gm, (match) => {
                const lines = match.split('\n').map(line => line.replace(/^\d+\. /, ''));
                const listItems = lines.map(line => `<li>${line}</li>`).join('');
                return `<ol class="list-decimal list-inside my-2">${listItems}</ol>`;
            });

        // Then handle inline formatting
        processedText = processedText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-sm">$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer">$1</a>');

        // Finally, convert remaining newlines to line breaks
        processedText = processedText.replace(/\n/g, '<br/>');

        return processedText;
    };

    return [{ isPreview }, { formatText, setIsPreview, renderPreview, textareaRef }];
}

interface State {
    isPreview: boolean;
};

interface Handlers {
    formatText: (type: string) => void;
    setIsPreview: Dispatch<SetStateAction<boolean>>;
    renderPreview: (text: string) => string;
    textareaRef: React.RefObject<HTMLTextAreaElement>;
};

export interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}