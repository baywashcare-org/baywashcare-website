-- Launch waitlist: people who asked to be notified when the app launches.
CREATE TABLE IF NOT EXISTS waitlist (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email       text        NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_email_lowercase CHECK (email = lower(email)),
  CONSTRAINT waitlist_email_length CHECK (char_length(email) <= 254)
);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_key ON waitlist (email);
