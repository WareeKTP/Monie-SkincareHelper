CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  tag TEXT NOT NULL CHECK (tag IN ('Cleanser','Toner','Essence','Serum','Treatment','Exfoliant','Eye Cream','Moisturizer','Sunscreen','Sleeping Mask')),
  time TEXT NOT NULL CHECK (time IN ('am','pm','both')),
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON products(user_id);

CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slot TEXT NOT NULL CHECK (slot IN ('am','pm')),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  position INT NOT NULL,
  UNIQUE (user_id, slot, product_id)
);
CREATE INDEX ON routines(user_id, slot, position);

CREATE TABLE ingredients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  emoji TEXT NOT NULL,
  tag TEXT NOT NULL,
  description TEXT NOT NULL,
  best_time TEXT NOT NULL,
  time_icon TEXT NOT NULL,
  tip TEXT NOT NULL
);

INSERT INTO ingredients (id, name, emoji, tag, description, best_time, time_icon, tip) VALUES
('vitc',  'Vitamin C',       '🍊', 'brighten', 'A potent antioxidant that brightens skin tone, fades dark spots, and shields against environmental damage.', 'AM', '☀️', 'Apply before SPF for best effect'),
('ha',    'Hyaluronic Acid', '💦', 'hydrate',  'A moisture magnet that draws water into the skin, keeping it plump and dewy all day.', 'AM & PM', '🕐', 'Apply on damp skin'),
('ret',   'Retinol',         '🌙', 'renew',    'The gold standard for cell turnover. Smooths texture, reduces fine lines, and fades dark spots over time.', 'PM', '🌙', 'Start slow — 2×/week'),
('nia',   'Niacinamide',     '💧', 'calm',     'A multitasker that reduces redness, minimises pores, and gently brightens without irritation.', 'AM & PM', '🕐', 'Pairs well with most actives'),
('spf',   'SPF 50',          '☀️', 'protect',  'Your #1 anti-aging product. Blocks UVA/UVB rays that cause premature aging, dark spots, and skin cancer.', 'AM', '☀️', 'Last step, always'),
('cen',   'Centella',        '🌿', 'calm',     'A soothing botanical that calms redness, heals the skin barrier, and reduces inflammation.', 'AM & PM', '🕐', 'Great for sensitive skin'),
('aha',   'AHA / BHA',       '✨', 'renew',    'Chemical exfoliants that dissolve dead skin cells to reveal brighter, smoother skin underneath.', 'PM', '🌙', 'Don''t pair with retinol'),
('cer',   'Ceramide',        '🫧', 'hydrate',  'Lipids that reinforce the skin barrier, locking in moisture and keeping irritants out.', 'AM & PM', '🕐', 'Locks in everything underneath');
