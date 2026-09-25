"use client";

import { useState } from "react";
import CTAButton from "../site/CTAButton";
import GlassPanel from "../site/GlassPanel";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    team: "RED" | "BLUE";
    maxPlayers: number;
    durationMin: number;
  }) => void;
};

export default function CreateBattleModal({ open, onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [team, setTeam] = useState<"RED" | "BLUE">("RED");
  const [maxPlayers, setMaxPlayers] = useState(16);
  const [durationMin, setDurationMin] = useState(15);

  if (!open) return null;

  return (
    <div className="sm-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="sm-modal sm-modal-enter"
        role="dialog"
        aria-labelledby="create-battle-title"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassPanel>
          <h2 id="create-battle-title" className="sm-brand-font sm-modal__title">
            Create battle
          </h2>
          <form
            className="sm-modal__form"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit?.({ name, team, maxPlayers, durationMin });
            }}
          >
            <label>
              Battle name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Your team
              <select value={team} onChange={(e) => setTeam(e.target.value as "RED" | "BLUE")}>
                <option value="RED">Red</option>
                <option value="BLUE">Blue</option>
              </select>
            </label>
            <label>
              Player limit
              <input
                type="number"
                min={2}
                max={32}
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
              />
            </label>
            <label>
              Duration (minutes)
              <input
                type="number"
                min={5}
                max={60}
                value={durationMin}
                onChange={(e) => setDurationMin(Number(e.target.value))}
              />
            </label>
            <div className="sm-modal__actions">
              <CTAButton type="button" variant="ghost" onClick={onClose}>Cancel</CTAButton>
              <CTAButton type="submit" variant="primary">Create</CTAButton>
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
          width: min(100%, 420px);
        }
        .sm-modal__title {
          margin: 0 0 1rem;
          font-size: 0.9rem;
          letter-spacing: 0.14em;
        }
        .sm-modal__form label {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 0.85rem;
          font-size: 0.75rem;
          color: var(--sm-text-secondary);
        }
        input,
        select {
          padding: 0.55rem 0.65rem;
          background: var(--sm-bg-elevated);
          border: 1px solid var(--sm-border);
          color: var(--sm-text-primary);
          border-radius: 2px;
        }
        .sm-modal__actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
