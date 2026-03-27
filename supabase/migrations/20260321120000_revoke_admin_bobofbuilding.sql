-- Revoke mistaken harness/admin access for bobofbuilding@bittrees.io.
-- Root cause: admin role is granted when email (or GitHub id) matches admin_allowlist on signup (handle_new_user).

DELETE FROM admin_allowlist
WHERE lower(trim(coalesce(email, ''))) = lower(trim('bobofbuilding@bittrees.io'));

UPDATE profiles
SET role = 'client', updated_at = now()
WHERE lower(trim(coalesce(email, ''))) = lower(trim('bobofbuilding@bittrees.io'));
