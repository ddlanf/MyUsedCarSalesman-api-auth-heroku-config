DROP TYPE IF EXISTS  message_category;

CREATE TYPE message_category AS ENUM (
    'Complaint',
    'Bug',
    'Report'
);

ALTER TABLE myusedcarsalesman_reports
  ADD COLUMN
    message_type message_category;
