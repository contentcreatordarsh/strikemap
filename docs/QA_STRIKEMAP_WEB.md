# StrikeMap Web — QA checklist (Phase 14)

## Website

- [ ] Intro loads (first visit per tab)
- [ ] Enter works; returning visit skips intro
- [ ] Navigation + mobile menu (≤768px)
- [ ] Hero CTAs: Play, Create, Watch demo
- [ ] Scroll story sections reveal on scroll
- [ ] Live battles: loading, demo, empty, error
- [ ] Create / join / auth modals
- [ ] `/demo/` labeled demo
- [ ] `/map/` legacy intel map
- [ ] Footer links

## Multiplayer (requires `NEXT_PUBLIC_API_URL` + platform)

- [ ] Signup / login
- [ ] Create game → lobby → start → game
- [ ] Join by code
- [ ] WebSocket live + reconnect banner
- [ ] Territory HUD updates in demo

## Build / infra

- [ ] `cd web && npm run build`
- [ ] `cd strikemap-platform && npm test` (if available)
- [ ] No secrets in client bundle
