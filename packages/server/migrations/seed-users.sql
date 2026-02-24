CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  login VARCHAR(255) UNIQUE NOT NULL,
  theme VARCHAR(50) DEFAULT 'light',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS users_login_idx ON users(login);

INSERT INTO users (login, theme) VALUES 
  ('user1', 'light'),
  ('user2', 'dark')
ON CONFLICT (login) DO NOTHING;

SELECT * FROM users;
