<template>
  <div>
    <Navbar />
    <Nuxt />
    <DarkModeToggle />
  </div>
</template>

<style>
.filter {
  width: 40%;
  font-size: 14px;
  padding: 12px 14px;
  background-color: var(--color-field-01);
  border: 1px solid var(--color-border-01);
  outline: 0;
  color: var(--color-text-02);
  margin-bottom: 12px;
  margin-left: 35px;
}

.persons {
  list-style-type: none;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 0;
}
</style>
