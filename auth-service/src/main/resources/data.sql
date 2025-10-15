-- Default admin user for initial setup
-- Note: In production, passwords should be hashed

-- Admin user: ficha=1001, cedula=12345678
INSERT INTO users (num_ficha, cedula, nombre, apellido, role, is_active, created_at, updated_at)
VALUES ('1001', '12345678', 'Admin', 'Sistema', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (num_ficha) DO NOTHING;
