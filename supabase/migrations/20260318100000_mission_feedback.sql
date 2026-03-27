-- Mission doc feedback (fractal: same input pattern as mission creation, per output).
-- Run after client_missions_and_invites if you use RLS.

CREATE TABLE IF NOT EXISTS mission_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mission_slug text NOT NULL,
  doc_path text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mission_feedback_mission_slug ON mission_feedback(mission_slug);
CREATE INDEX IF NOT EXISTS idx_mission_feedback_doc_path ON mission_feedback(mission_slug, doc_path);

ALTER TABLE mission_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users insert own feedback" ON mission_feedback;
CREATE POLICY "Users insert own feedback"
  ON mission_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users read own feedback" ON mission_feedback;
CREATE POLICY "Users read own feedback"
  ON mission_feedback FOR SELECT
  USING (auth.uid() = user_id);
