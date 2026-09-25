import CTAButton from "../site/CTAButton";
import GlassPanel from "../site/GlassPanel";
import PlayerMarker from "./PlayerMarker";

export type LobbyPlayer = {
  id: string;
  name: string;
  team: "RED" | "BLUE";
  ready?: boolean;
};

type Props = {
  battleCode: string;
  red: LobbyPlayer[];
  blue: LobbyPlayer[];
  isHost?: boolean;
  onReady?: () => void;
  onStart?: () => void;
};

export default function BattleLobby({
  battleCode,
  red,
  blue,
  isHost,
  onReady,
  onStart,
}: Props) {
  return (
    <GlassPanel className="sm-lobby">
      <h2 className="sm-lobby__title sm-brand-font">Battle #{battleCode}</h2>
      <div className="sm-lobby__teams">
        <div>
          <h3 className="sm-lobby__team sm-lobby__team--red">Red</h3>
          <ul>
            {red.map((p) => (
              <li key={p.id}>
                <PlayerMarker team="RED" label={p.name} />
                {p.ready ? <span className="sm-lobby__ready">Ready</span> : null}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="sm-lobby__team sm-lobby__team--blue">Blue</h3>
          <ul>
            {blue.map((p) => (
              <li key={p.id}>
                <PlayerMarker team="BLUE" label={p.name} />
                {p.ready ? <span className="sm-lobby__ready">Ready</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sm-lobby__actions">
        <CTAButton variant="ghost" onClick={onReady}>Ready</CTAButton>
        {isHost ? (
          <CTAButton variant="primary" onClick={onStart}>Start battle</CTAButton>
        ) : null}
      </div>
      <style jsx>{`
        .sm-lobby__title {
          margin: 0 0 1.25rem;
          font-size: 1rem;
          letter-spacing: 0.12em;
        }
        .sm-lobby__teams {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .sm-lobby__team {
          margin: 0 0 0.75rem;
          font-size: 0.75rem;
          letter-spacing: 0.16em;
        }
        .sm-lobby__team--red {
          color: var(--sm-team-red);
        }
        .sm-lobby__team--blue {
          color: var(--sm-team-blue);
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 0;
          border-bottom: 1px solid var(--sm-border);
        }
        .sm-lobby__ready {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: #2ee59d;
        }
        .sm-lobby__actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
      `}</style>
    </GlassPanel>
  );
}
