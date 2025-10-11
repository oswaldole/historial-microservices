-- Sample users for testing
-- Note: In production, passwords should be hashed

-- Admin user: ficha=1001, cedula=12345678
INSERT INTO users (num_ficha, cedula, nombre, apellido, role, is_active, created_at, updated_at)
VALUES ('1001', '12345678', 'Admin', 'Sistema', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (num_ficha) DO NOTHING;

-- Regular user: ficha=2001, cedula=87654321
INSERT INTO users (num_ficha, cedula, nombre, apellido, role, is_active, created_at, updated_at)
VALUES ('2001', '87654321', 'Usuario', 'Prueba', 'USUARIO', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (num_ficha) DO NOTHING;

-- Additional sample users
INSERT INTO users (num_ficha, cedula, nombre, apellido, role, is_active, created_at, updated_at)
VALUES ('1002', '11111111', 'Oswaldo', 'Lezama', 'ADMIN', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (num_ficha) DO NOTHING;

INSERT INTO users (num_ficha, cedula, nombre, apellido, role, is_active, created_at, updated_at)
VALUES ('2002', '22222222', 'Maria', 'Garcia', 'USUARIO', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (num_ficha) DO NOTHING;
