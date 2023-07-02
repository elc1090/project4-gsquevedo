<template>
  <div id="navbar">
    <nav>
      <a href="/">
        <img src="@/assets/jardim.png" alt="Logo" class="logo" />
      </a>
      <ul class="navbar-items">
        <li><a href="/mapa">Espaço Geográfico</a></li>
        <li><a href="/mural">Mural de fotos</a></li>
      </ul>
    </nav>
  </div>
</template>

<style>
#navbar {
  background-color: #448a4e;
  padding: 15px;
}

nav {
  display: flex;
  align-items: center;
}

.logo {
  height: 60px;
  margin-right: 10px;
}

.navbar-items {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin-left: auto;
}

.navbar-items li {
  margin-right: 10px;
  padding: 20px 10px;
}

.navbar-items li a {
  text-decoration: none;
  font-weight: bold;
  color: #fff;
}

.navbar-items li:hover {
  background-color: #333;
}
</style>