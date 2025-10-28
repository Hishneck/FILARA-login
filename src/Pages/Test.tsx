import {
    Box,
  Button,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
// import * as React from "react";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  // Можно добавить другие поля, которые возвращает ваш API
  user?: {
    id: string;
    name: string;
  };
}

const Test: React.FC = () => {
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Ошибка авторизации: ${response.statusText}`);
      }

      const data: LoginResponse = await response.json();

      // Сохраняем токен в localStorage
      localStorage.setItem("authToken", data.access_token);

      console.log("Авторизация успешна, токен сохранён");

      // Можно перенаправить на главную страницу
      // window.location.href = '/';
    } catch (error) {
      console.error("Ошибка при входе:", error);
      throw error; // Передаём ошибку дальше, если нужно показать пользователю
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = {
      email,
      password,
    };

    try {
      await login(credentials);
      // Здесь можно добавить логику после успешного входа
    } catch (err) {
      // Обработка ошибки (например, показать сообщение)
      alert("Неудачная авторизация. Проверьте данные.");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        required
      />
      <button type="submit">Войти</button>
    </form>
          {/* <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h5">Вход в учётную запись</Typography>
            <InputLabel className="input_label">E-mail</InputLabel>
            <TextField
              type="email"
              // label="Введите свой e-mail"
              placeholder="Введите свой e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <InputLabel className="input_label">Пароль</InputLabel>
            <TextField
              // label="Введите пароль"
              placeholder="Введите пароль"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" type="submit">Войти</Button>
          </Box> */}
    </>
  );
}

export default Test;
