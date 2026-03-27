-- Gate input interface: work order assignments + mission_gate_inputs + profiles extension.
-- See docs/plans/gate-input-interface-plan.md and docs/plans/missions-status-and-gate-input-handoff.md.
-- Storage bucket "mission-gate-inputs" must be created in Supabase Dashboard (not SQL).

-- 1. work_order_assignments: who is assigned to which gate (admin assigns)
CREATE TABLE IF NOT EXISTS work_order_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_slug text NOT NULL,
  work_order_path text NOT NULL,
  assigned_at timestamptz DEFAULT now(),
  assigned_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  UNIQUE(user_id, mission_slug, work_order_path)
);

CREATE INDEX IF NOT EXISTS idx_work_order_assignments_mission ON work_order_assignments(mission_slug);
CREATE INDEX IF NOT EXISTS idx_work_order_assignments_user ON work_order_assignments(user_id);

ALTER TABLE work_order_assignments ENABLE ROW LEVEL SECURITY;

-- Users can read their own assignments (so API with anon key can check "am I assigned?")
DROP POLICY IF EXISTS "Users read own assignments" ON work_order_assignments;
CREATE POLICY "Users read own assignments"
  ON work_order_assignments FOR SELECT
  USING (auth.uid() = user_id);

-- Writes (assign/unassign) via service role only (admin UI)
DROP POLICY IF EXISTS "Service role only for write" ON work_order_assignments;
CREATE POLICY "Service role only for write"
  ON work_order_assignments FOR ALL
  USING (false);

-- 2. mission_gate_inputs: one row per user per gate (evolve = files; approval = payload)
CREATE TABLE IF NOT EXISTS mission_gate_inputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_slug text NOT NULL,
  work_order_path text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path text,
  file_manifest jsonb,
  payload jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(mission_slug, work_order_path, user_id)
);

CREATE INDEX IF NOT EXISTS idx_mission_gate_inputs_mission ON mission_gate_inputs(mission_slug);
CREATE INDEX IF NOT EXISTS idx_mission_gate_inputs_work_order ON mission_gate_inputs(mission_slug, work_order_path);

ALTER TABLE mission_gate_inputs ENABLE ROW LEVEL SECURITY;

-- Assigned clients (and admin via service role) can submit: read/write own row
DROP POLICY IF EXISTS "Users read own gate inputs" ON mission_gate_inputs;
CREATE POLICY "Users read own gate inputs"
  ON mission_gate_inputs FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own gate input" ON mission_gate_inputs;
CREATE POLICY "Users insert own gate input"
  ON mission_gate_inputs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users update own gate input" ON mission_gate_inputs;
CREATE POLICY "Users update own gate input"
  ON mission_gate_inputs FOR UPDATE
  USING (auth.uid() = user_id);

-- 3. Profiles extension: avatar_url, display_name (for gate input / assignment UI)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS display_name text;
