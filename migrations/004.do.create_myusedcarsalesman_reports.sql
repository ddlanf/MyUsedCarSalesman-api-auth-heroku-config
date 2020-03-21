CREATE TABLE myusedcarsalesman_reports (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    date_sent TIMESTAMP DEFAULT now() NOT NULL,
    user_id INTEGER
        REFERENCES myusedcarsalesman_users(id) ON DELETE CASCADE NOT NULL
);
