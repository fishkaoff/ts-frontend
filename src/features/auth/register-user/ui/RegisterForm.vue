<template>
  <div class="register-form">
    <form class="form">
      <h1 class="title">Регистрация</h1>

      <label for="email" class="label">Электронная почта</label>
      <input v-model="email" type="text" class="input" name="email" placeholder="example@mail.ru" />
      <error-message v-if="emailError">{{ emailError }}</error-message>

      <label for="name" class="label">Имя</label>
      <input v-model="name" type="text" class="input" name="name" placeholder="Иван" />
      <error-message v-if="nameError">{{ nameError }}</error-message>

      <label for="lastname" class="label">Фамилия</label>
      <input v-model="lastname" type="text" class="input" name="lastname" placeholder="Иванов" />
      <error-message v-if="lastnameError">{{ lastnameError }}</error-message>

      <label for="password" class="label">Пароль</label>
      <input
        v-model="password"
        type="password"
        class="input"
        name="password"
        placeholder="Пароль"
      />

      <label for="password-repeat" class="label">Повторите пароль</label>
      <input
        v-model="passwordRepeat"
        type="password"
        class="input"
        name="password-repeat"
        placeholder="Повторние пароля"
      />
      <error-message v-if="passwordError">{{ passwordError }}</error-message>

      <p class="switch">
        Уже есть аккаунт?
        <router-link :to="{ name: 'LoginView' }" class="redirect">Войти</router-link>
      </p>

      <error-message v-if="submitError" class="submit-error">{{ submitError }}</error-message>

      <input
        type="submit"
        value="Отправить"
        class="btn"
        :disabled="!isFormValid || loading"
        @click="register"
      />

      <p class="remark">
        Нажимая кнопку "Отправить" я
        <router-link :to="{}" class="link"
          >даю согласие на обработку персональных данных</router-link
        >
        в соответствии с
        <router-link :to="{}" class="link">политикой конфиденциальности</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRegister } from '../model/useRegister'
import ErrorMessage from '@/shared/ui/Errors/ErrorMessage.vue'

const {
  email,
  password,
  name,
  lastname,
  passwordRepeat,

  submitError,
  emailError,
  passwordError,
  nameError,
  lastnameError,

  isFormValid,
  loading,
  register,
} = useRegister()
</script>

<style scoped lang="scss">
.register-form {
  @include mixins.container;

  .form {
    width: 800px;
    margin: 0 auto;

    padding: 40px;
    border-radius: 15px;

    background-color: #fff;

    .title {
      @include mixins.title(26px);
      text-align: center;
    }

    .label {
      @include mixins.text(18px);
      display: block;

      margin-top: 30px;
    }

    .input {
      outline: none;
      border: none;

      padding: 10px 0 5px 0;

      width: 100%;
      border-bottom: 1px solid variables.$color-main;

      @include mixins.text(16px);
      color: variables.$color-accent;
    }

    .switch {
      @include mixins.text(16px);
      margin-top: 20px;

      .redirect {
        color: variables.$color-accent;
        transition: all 0.3s;
      }

      .redirect:hover {
        color: variables.$color-accent-hover;
      }
    }

    .submit-error {
      margin-top: 25px;
    }

    .btn {
      display: block;
      border: none;
      outline: none;

      @include mixins.text(18px);
      color: #fff;
      background-color: variables.$color-accent;

      width: 70%;
      padding: 15px;
      border-radius: 15px;

      margin: 0 auto;
      margin-top: 35px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn:hover {
      background-color: variables.$color-accent-hover;
    }

    .remark {
      @include mixins.text(16px);
      text-align: center;

      margin-top: 25px;
      line-height: 1.6em;

      .link {
        color: variables.$color-accent;
        transition: all 0.3s;
      }

      .link:hover {
        color: variables.$color-accent-hover;
      }
    }
  }
}
</style>
