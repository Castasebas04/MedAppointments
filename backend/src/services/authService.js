const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const register = async (name, email, password) => {
  // Verificar si el email ya existe
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear el usuario
  const user = await userRepository.create(name, email, hashedPassword);

  // Generar token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { user, token };
};

const login = async (email, password) => {
  // Buscar el usuario
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Verificar contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Generar token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { user: { id: user.id, name: user.name, email: user.email }, token };
};

module.exports = { register, login };