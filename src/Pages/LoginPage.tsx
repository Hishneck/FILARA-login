import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../image/Logo.png";
import * as React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "../styles/login.css";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "../redux";
import {useNavigate } from "react-router-dom";
interface LoginFormData {
  email: string;
  password: string;
  access_token: string;
}

function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const navigate = useNavigate();


  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [addProduct, {}] = useAddProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });
  const onSubmit = async (data: LoginFormData) => {
    console.log("Form submitted:", data);
    setServerError(null);

    try {
      const response = await addProduct({
        email: data.email,
        password: data.password,
      }).unwrap();

      localStorage.setItem("token", response.access_token);
      console.log(data);
      navigate('/homepage');

      console.log("Успешная отправка данных");
    } catch (error: any) {
      console.error("Ошибка при отправке:", error);

      // Извлекаем сообщение об ошибке из ответа сервера
      let errorMessage = "Пароль или email введены неверно.";

      if (error?.data?.message) {
        errorMessage = "Пароль или email введены неверно.";
      } else if (error?.status === 401) {
        errorMessage = "Неверный email или пароль";
      }

      setServerError(errorMessage); // Сохраняем ошибку для отображения
    }
  };

  return (
    <>
      <Container className="container" sx={{ padding: "0px 0px" }}>
        <CardMedia image={Logo} component="img" alt="Logo" className="logo" />
        <Card sx={{ width: 514 }}>
          <CardContent
            className="card_content"
            onSubmit={handleSubmit(onSubmit)}
            component="form"
          >
            <Typography variant="h5">Вход в учётную запись</Typography>
            {serverError && (
              <Typography
                color="error"
                variant="body2"
                sx={{ mb: 2, textAlign: "center" }}
              >
                {serverError}
              </Typography>
            )}
            <InputLabel className="input_label">E-mail</InputLabel>
            <TextField
              type="email"
              // label="Введите свой e-mail"
              placeholder="Введите свой e-mail"
              {...register("email", {
                required: "Это поле не может быть пустым!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Введите корректный email вида example@email.com",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            ></TextField>
            <InputLabel className="input_label">Пароль</InputLabel>
            <TextField
              // label="Введите пароль"
              {...register("password", {
                required: "Это поле не может быть пустым!",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              placeholder="Введите пароль"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="переключить видимость пароля"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Запомнить меня"
              sx={{ marginBottom: "24px" }}
            />
            <Button variant="contained" type="submit">
              Войти
            </Button>
            <Button variant="text">Забыли пароль?</Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default LoginPage;
