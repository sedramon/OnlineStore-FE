import useFetch from "@/hooks/useFetch";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface User {
  username: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const { data: users } = useFetch("http://localhost:8080/api/users", "GET");

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<User> = (data) => {
    const user = users.find(
      (u: User) =>
        u.username === data.username ||
        u.email === data.email ||
        u.password === data.password
    );
    if (user) {
      setErrorMessage(
        "User already exists with that Username, Email or Password!"
      );
      return;
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      fetch("http://localhost:8080/api/users", requestOptions)
        .then((response) => response.json)
        .then((data) => data);
      router.push("/");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: "onSubmit" });

  return (
    <div className={styles.main}>
      <main className={styles.form}>
        <div
          className={`d-flex flex-column align-items-center ${styles["form"]}`}
        >
          <h1 className="mb-4">SIGN UP</h1>
          <input
            className={"form-control mb-4"}
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Field Username is required",
              validate: (value) => {
                if (!/^[a-zA-Z]+$/.test(value)) {
                  return "For Username use only characters";
                }
                if (value.length < 3) {
                  return "Length of Username must be greater than 3 chars!";
                }
              },
            })}
          />
          <input
            className={"form-control mb-4"}
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Field Email is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Length of Email must be greater than 3 chars!";
                }
              },
            })}
          />
          <input
            className={"form-control mb-4"}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Field Password is required",
              validate: (value) => {
                if (value.length < 3) {
                  return "Length of Password must be greater than 3 chars!";
                }
              },
            })}
          />
          <button
            className={"btn btn-primary"}
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </button>
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </div>
      </main>
    </div>
  );
}
