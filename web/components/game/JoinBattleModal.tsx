"use client";

import { useState } from "react";
import CTAButton from "../site/CTAButton";
import GlassPanel from "../site/GlassPanel";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (code: string) => void;
};

export default function JoinBattleModal({ open, onClose, onSubmit }: Props) {
  const [code, setCode] = useState("");

  if (!open) return null;

  return (
    <div className="sm-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="sm-modal sm-modal-enter"
        role="dialog"
        aria-labelledby="join-battle-title"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassPanel>
          <h2 id="join-battle-title" className="sm-brand-font sm-modal__title">
            Join battle
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.(code.trim());
            }}
          >
            <label>
              Battle code
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="STRIKE-042"
                required
                autoComplete="off"
              />
            </label>
            <div className="sm-modal__actions">
              <CTAButton type="button" variant="ghost" onClick={onClose}>Cancel</CTAButton>
              <CTAButton type="submit" variant="primary">Join</CTAButton>
            </div>
          </form>
        </GlassPanel>
      </div>
      <style jsx>{`
        .sm-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 150;
          background: rgba(0, 0, 0, 0.65);
          display: grid;
          place-items: center;
          padding: 1rem;
        }
        .sm-modal {
          width: min(100%, 380px);
        }
        .sm-modal__title {
          margin: 0 0 1rem;
          font-size: 0.9rem;
          letter-spacing: 0.14em;
        }
        label {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--sm-text-secondary);
        }
        input {
          padding: 0.55rem 0.65rem;
          background: var(--sm-bg-elevated);
          border: 1px solid var(--sm-border);
          color: var(--sm-text-primary);
          border-radius: 2px;
          font-family: var(--sm-font-display);
          letter-spacing: 0.12em;
        }
        .sm-modal__actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
