import NavLayout from "@/components/layouts/main-layout";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { User } from "@/types/users/User";
import { useForm } from "react-hook-form";

export default function UsersPage() {
  const router = useRouter();
  const {
    data: users,
    isLoading,
    error,
    refetch,
  } = useFetch("http://localhost:8080/api/users", "GET");

  const goToUpdatePage = (id: string) => {
    router.push(`/users/update/${id}`);
  };

  const deleteUser = (id: string) => {
    fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE",
    }).then(refetch);
  };

  return (
    <div>
      <main className={styles.main}>
        <div className="container d-flex flex-column align-items-center">
          <h1 className={`${styles.h1} mb-5`}>User List</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>An error occurred while fetching users.</p>
          ) : users && users.length > 0 ? (
            <div className="users-list">
              {users.map((userObj: User, index: number) => (
                <div
                  key={userObj.id}
                  className="user d-flex align-items-center justify-content-between m-3 border rounded"
                >
                  <div className="user-info d-flex align-items-center">
                    <img
                      src="/images/profilepicturenew.jpg"
                      alt={userObj.username}
                      width="50"
                      height="50"
                      className="rounded-circle m-3"
                    />
                    <div className="m-3">
                      <h5>{userObj.username}</h5>
                      <p>{userObj.email}</p>
                    </div>
                  </div>
                  <div className="user-actions d-flex align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary m-3"
                      onClick={() => goToUpdatePage(userObj.id)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger m-3"
                      onClick={() => deleteUser(userObj.id)}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
