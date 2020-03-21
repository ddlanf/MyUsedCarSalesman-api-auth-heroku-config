CREATE TABLE myusedcarsalesman_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);
