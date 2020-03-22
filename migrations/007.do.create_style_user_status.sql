DROP TYPE IF EXISTS  user_type;

CREATE TYPE user_type AS ENUM (
    'Active',
    'Blocked'
);

ALTER TABLE myusedcarsalesman_users
  ADD COLUMN
    user_status user_type DEFAULT 'Active'
