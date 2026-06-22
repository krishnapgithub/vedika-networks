-- 1. Dashboard Bento Component Tracking Schema
CREATE TABLE IF NOT EXISTS bento_cards (
    id TEXT PRIMARY KEY,
    card_key TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtext TEXT,
    image_url TEXT,
    badge_text TEXT,
    grid_zone TEXT DEFAULT 'left'
);

-- 2. Populate Default Production Dashboard Rows
INSERT OR IGNORE INTO bento_cards (id, card_key, title, subtext, image_url, badge_text, grid_zone) VALUES 
('c1', 'travel', 'Tours & Travels', 'Map tours intuitively and manage custom global itineraries effortlessly.', 'travel.png', NULL, 'left'),
('c2', 'matrimony', 'Matrimonial Services', 'Browse matching profiles within secure directory panels with smart filters.', 'matrimony.png', NULL, 'left'),
('c3', 'webdesign', 'Web Portal Creation', 'Engineered, high-performance, dynamic application portals.', 'webdesign.png', NULL, 'left'),
('c4', 'operations', 'Operational Control', 'Supervise cross-department workflows seamlessly.', NULL, 'New', 'left');
