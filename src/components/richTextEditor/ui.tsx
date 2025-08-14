import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, List, ListOrdered, Link, Code, Quote, Eye, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RichTextEditorProps, useHandler } from './handler';

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  const [state, handlers] = useHandler(value, onChange);

  return (
    <div className={cn("space-y-2", className)}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-border rounded-t-md bg-muted/30 px-2 sm:px-3 py-2 gap-2 sm:gap-0">
        <div className="flex items-center gap-1 flex-wrap">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handlers.formatText('bold')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handlers.formatText('italic')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handlers.formatText('code')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
            title="Code"
          >
            <Code className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <div className="w-px h-4 bg-border mx-1 hidden sm:block" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handlers.formatText('quote')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
            title="Quote (Ctrl+Q)"
          >
            <Quote className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handlers.formatText('list')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
            title="Unordered List"
          >
            <List className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handlers.formatText('ordered-list')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
            title="Ordered List"
          >
            <ListOrdered className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handlers.formatText('link')}
            className="h-7 w-7 sm:h-8 sm:w-8 p-0"
            title="Link (Ctrl+K)"
          >
            <Link className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant={!state.isPreview ? "secondary" : "ghost"}
            size="sm"
            onClick={() => handlers.setIsPreview(false)}
            className="h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm"
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Edit
          </Button>
          <Button
            type="button"
            variant={state.isPreview ? "secondary" : "ghost"}
            size="sm"
            onClick={() => handlers.setIsPreview(true)}
            className="h-7 sm:h-8 px-2 sm:px-3 text-xs sm:text-sm"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Preview
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="border border-t-0 border-border rounded-b-md">
        {!state.isPreview ? (
          <Textarea
            ref={handlers.textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[120px] sm:min-h-[200px] border-0 rounded-t-none focus-visible:ring-0 resize-none text-sm sm:text-base"
          />
        ) : (
          <div
            className="min-h-[120px] sm:min-h-[200px] p-2 sm:p-3 prose prose-sm max-w-none text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: handlers.renderPreview(value) }}
          />
        )}
      </div>

      {!state.isPreview && (
        <p className="text-xs text-muted-foreground">
          Tip: Select text and click formatting buttons, or use keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+Q, Ctrl+K), or type **bold**, *italic*, `code`, {'>'}quotes, - lists, and [links](url) for formatting
        </p>
      )}
    </div>
  );
}