import React from "react";

interface RichTitleProps {
  text: string;
  /** Classes for the *highlighted* part */
  highlightClassName?: string;
  /** Wrap each line in a span with these classes instead of inserting <br /> */
  lineClassName?: string;
  /** Classes for the <br /> between lines (e.g. "hidden sm:inline") */
  breakClassName?: string;
}

/**
 * Renders editor-friendly title text:
 *   "One Stop Solution for *Branding*"  → highlighted "Branding"
 *   "Line one\nLine two"                → line break
 */
export function RichTitle({ text, highlightClassName, lineClassName, breakClassName }: RichTitleProps) {
  const lines = (text || "").split(/\r?\n/);

  const renderLine = (line: string, lineIndex: number) =>
    line.split(/(\*[^*]+\*)/g).map((part, i) => {
      if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
        return (
          <span key={`${lineIndex}-${i}`} className={highlightClassName}>
            {part.slice(1, -1)}
          </span>
        );
      }
      return <React.Fragment key={`${lineIndex}-${i}`}>{part}</React.Fragment>;
    });

  if (lineClassName) {
    return (
      <>
        {lines.map((line, i) => (
          <span key={i} className={lineClassName}>
            {renderLine(line, i)}
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br className={breakClassName} />}
          {renderLine(line, i)}
        </React.Fragment>
      ))}
    </>
  );
}
