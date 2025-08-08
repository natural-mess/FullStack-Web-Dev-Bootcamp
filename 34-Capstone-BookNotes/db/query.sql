CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    isbn VARCHAR(13) NOT NULL,
    name VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    date TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    rating smallint NOT NULL check (rating between 1 and 5),
    note TEXT NOT NULL
);