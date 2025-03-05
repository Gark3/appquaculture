<template>
  <div class="login-container">
    <!-- Video de fondo -->
    <video autoplay muted @ended="mostrarLogin" class="video-fondo">
      <source src="@/assets/Diseño sin título.mp4" type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </video>
    
    <!-- Formulario de login -->
    <div v-if="loginVisible" class="login-form">
      <!-- Aquí va tu formulario -->
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="login">
        <label for="username">Usuario:</label>
        <input type="text" v-model="username" required />
        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" required />
        <div class="buttons">
          <button type="submit">Iniciar sesión</button>
          <a href="#">¿Olvidaste tu contraseña?</a>
          <a href="#">Registrarse</a>
        </div>
        <p v-if="loginFailed" class="error-message">Usuario o contraseña incorrectos.</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginVisible: false,
      username: 'Bryan',  // Usuario predeterminado
      password: '1234',   // Contraseña predeterminada
      loginFailed: false, // Bandera para mostrar mensaje de error
    }
  },
  methods: {
    mostrarLogin() {
      this.loginVisible = true;
    },
    login() {
      if (this.username === 'Bryan' && this.password === '1234') {
        this.$emit('login');
        this.loginFailed = false;
      } else {
        this.loginFailed = true;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

/* Video de fondo: se queda en la última imagen tras finalizar */
.video-fondo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* Cuadro centrado para el formulario */
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Estilos adicionales para el formulario (opcional) */
.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login-form form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-form label {
  font-weight: bold;
}

.login-form input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-form button {
  padding: 10px;
  border: none;
  background-color: #8d2a2a;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.login-form button:hover {
  background-color: #5a3d31;
}

.login-form a {
  text-align: center;
  color: #8d2a2a;
  text-decoration: none;
  font-weight: bold;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
