# Supabase migrations (CLI)

Migrations here are applied to the **linked remote** project with:

```bash
npx supabase db push
```

- **Naming:** `YYYYMMDDHHmmss_description.sql`
- **Agent:** See `.cursor/rules/supabase-manager.mdc` — the agent acts as Supabase Manager and can add/run these.

**Applied migrations:**
- `20260318100000_mission_feedback.sql` — mission_feedback table (doc feedback).
- `20260318110000_work_order_assignments_and_gate_inputs.sql` — work_order_assignments, mission_gate_inputs, profiles (avatar_url, display_name). Storage bucket `mission-gate-inputs` is created in Dashboard, not SQL.
