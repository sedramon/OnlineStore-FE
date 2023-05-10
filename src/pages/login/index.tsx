import UserContext from "@/UserContext";
import useFetch from "@/hooks/useFetch";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface User {
  username: string;
  email: string;
  password: string;
}

export default function LoginPage() {
  const { data: users } = useFetch("http://localhost:8080/api/users", "GET");

  const context = useContext(UserContext);

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit: SubmitHandler<User> = (data) => {
    const user = users.find(
      (u: User) =>
        u.username === data.username &&
        u.email === data.email &&
        u.password === data.password
    );
    if (user) {
      router.push("/");
      context.setUserContext(user);
    } else {
      setErrorMessage("Invalid username, email or password");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({ mode: "onSubmit" });

  return (
    <div className={styles.main}>
      <main className={`${styles.form}`}>
        <div className="d-flex flex-column align-items-center">
          <div
            className={`d-flex flex-column align-items-center ${styles["form"]}`}
          >
            <h1 className={`${styles.h1} m-3`}>LOGIN PAGE</h1>
            <input
              className={"form-control mb-4"}
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Field Username is required",
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
        </div>
      </main>
    </div>
  );
}
