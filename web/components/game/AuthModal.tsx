"use client";

import { useState } from "react";
import GlassPanel from "../site/GlassPanel";
import CTAButton from "../site/CTAButton";
import { login, signup } from "@/lib/api";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AuthModal({ open, onClose, onSuccess }: Props) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, username, password);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm-modal-backdrop" role="presentation" onClick={onClose}>
      <div className="sm-modal" role="dialog" onClick={(e) => e.stopPropagation()}>
        <GlassPanel>
          <h2 className="sm-brand-font sm-modal__title">
            {mode === "login" ? "Login" : "Create account"}
          </h2>
          <form onSubmit={submit}>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            {mode === "signup" ? (
              <label>
                Username
                <input value={username} onChange={(e) => setUsername(e.target.value)} required />
              </label>
            ) : null}
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </label>
            {error ? (
              <p className="sm-auth-error sm-status sm-status--error">
                <span className="sm-status-indicator" />
                {error}
              </p>
            ) : null}
            <div className="sm-modal__actions">
              <CTAButton type="button" variant="ghost" onClick={onClose}>Cancel</CTAButton>
              <CTAButton type="submit" variant="primary" disabled={loading}>
                {loading ? "…" : mode === "login" ? "Login" : "Sign up"}
              </CTAButton>
            </div>
          </form>
          <button type="button" className="sm-auth-toggle" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
            {mode === "login" ? "Need an account? Sign up" : "Have an account? Login"}
          </button>
        </GlassPanel>
      </div>
      <style jsx>{`
        .sm-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 160;
          background: rgba(0, 0, 0, 0.7);
          display: grid;
          place-items: center;
          padding: 1rem;
        }
        .sm-modal {
          width: min(100%, 400px);
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
          margin-bottom: 0.85rem;
          font-size: 0.75rem;
          color: var(--sm-text-secondary);
        }
        input {
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
        }
        .sm-auth-error {
          margin: 0 0 0.75rem;
        }
        .sm-auth-toggle {
          margin-top: 1rem;
          background: none;
          border: none;
          color: var(--sm-glow-cyan);
          cursor: pointer;
          font-size: 0.8rem;
          width: 100%;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
