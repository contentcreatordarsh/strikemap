import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export default function GlassPanel({ children, className = "", as = "div" }: Props) {
  const Tag = as;
  return (
    <Tag className={`sm-glass-panel sm-glass-panel-wrap ${className}`.trim()}>
      {children}
      <style jsx>{`
        .sm-glass-panel-wrap {
          border-radius: 2px;
          padding: var(--sm-space-lg);
        }
      `}</style>
    </Tag>
  );
}
