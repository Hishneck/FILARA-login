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


function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = () => {
    console.log("Form submitted:");
  };

  return (
    <>
      <Container className="container" sx={{ padding: "0px 0px" }}>
        <CardMedia image={Logo} component="img" alt="Logo" className="logo" />
        <Card sx={{ height: 401, width: 514 }}>
          <CardContent
            className="card_content"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h5">Вход в учётную запись</Typography>
            <InputLabel className="input_label">E-mail</InputLabel>
            <TextField
              type="email"
              label="Введите свой e-mail"
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Введите корректный email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            ></TextField>
            <InputLabel className="input_label">Пароль</InputLabel>
            <TextField
      label="Введите пароль"
      type={showPassword ? 'text' : 'password'}
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
            <Button variant="contained">Войти</Button>
            <Button variant="text">Забыли пароль?</Button>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default LoginPage;
