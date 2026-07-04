import { cn } from "@/lib/utils";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const blocks = content.split(/\n{2,}/);

  return (
    <div className={cn("space-y-3 text-sm leading-7", className)}>
      {blocks.map((block, blockIndex) => {
        const key = `${blockIndex}-${block}`;
        if (block.trim().startsWith("- ")) {
          return (
            <ul key={key} className="space-y-2 pl-1">
              {block
                .split("\n")
                .filter(Boolean)
                .map((item, itemIndex) => (
                  <li
                    key={`${itemIndex}-${item}`}
                    className="flex gap-2 text-muted-foreground"
                  >
                    <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 rounded-full bg-indigo-300" />
                    <span>{renderInline(item.replace(/^- /, ""))}</span>
                  </li>
                ))}
            </ul>
          );
        }

        return (
          <p key={key} className="text-muted-foreground">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return part;
  });
}
