CREATE TABLE myusedcarsalesman_images (
    id SERIAL PRIMARY KEY,
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    post_id INTEGER
        REFERENCES myusedcarsalesman_posts(id) ON DELETE CASCADE NOT NULL
);