CREATE TABLE myusedcarsalesman_posts (
    id SERIAL PRIMARY KEY,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    mileage INTEGER NOT NUll,
    description TEXT NOT NULL,
    commission_amount TEXT NOT NULL,
    location TEXT NOT NULL,
    price INTEGER NOT NUll,
    other_terms_and_conditions TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    user_id INTEGER REFERENCES myusedcarsalesman_users(id) ON DELETE CASCADE NOT NULL
);