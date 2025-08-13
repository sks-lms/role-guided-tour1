import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Link, 
  Code, 
  Quote,
  Eye,
  Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
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
        insertMarkdown('> ');
        break;
      case 'list':
        insertMarkdown('- ');
        break;
      case 'ordered-list':
        insertMarkdown('1. ');
        break;
      case 'link':
        insertMarkdown('[', '](url)');
        break;
    }
  };

  const renderPreview = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded">$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 italic">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^1\. (.*$)/gim, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between border border-border rounded-t-md bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('italic')}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('code')}
            className="h-8 w-8 p-0"
          >
            <Code className="h-4 w-4" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('quote')}
            className="h-8 w-8 p-0"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('list')}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('ordered-list')}
            className="h-8 w-8 p-0"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => formatText('link')}
            className="h-8 w-8 p-0"
          >
            <Link className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant={!isPreview ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setIsPreview(false)}
            className="h-8 px-3"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            type="button"
            variant={isPreview ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setIsPreview(true)}
            className="h-8 px-3"
          >
            <Eye className="h-4 w-4 mr-1" />
            Preview
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="border border-t-0 border-border rounded-b-md">
        {!isPreview ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[200px] border-0 rounded-t-none focus-visible:ring-0 resize-none"
          />
        ) : (
          <div 
            className="min-h-[200px] p-3 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        )}
      </div>
      
      {!isPreview && (
        <p className="text-xs text-muted-foreground">
          Tip: Use **bold**, *italic*, `code`, {'>'}quotes, - lists, and [links](url) for formatting
        </p>
      )}
    </div>
  );
}