# Goapay

## Current State
The app has a basic AdminPanel.tsx embedded in the main game page (visible only to admins), with just a draw number control. No dedicated admin page exists.

## Requested Changes (Diff)

### Add
- Dedicated full-page Admin Dashboard toggled from Header (admin only)
- Admin tabs: Draw Control, Bets Overview, Users, Transactions, Statistics

### Modify
- Header.tsx: add Admin button visible to admins
- App.tsx: add adminView toggle state, render AdminDashboard when active
- Move AdminPanel draw logic into Admin Dashboard Draw Control tab

### Remove
- Inline AdminPanel from main game section

## Implementation Plan
1. Create AdminDashboard.tsx with tabs: Draw Control, Bets, Users, Transactions, Stats
2. Reuse draw logic from AdminPanel.tsx in Draw Control tab
3. Populate Bets tab from GameContext state
4. Add mock Users and Transactions data
5. Update Header.tsx to show Admin link for admins
6. Update App.tsx to toggle between game view and admin dashboard
