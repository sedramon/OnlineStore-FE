import NavLayout from "@/components/layouts/main-layout";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/router";
import { User } from "@/types/users/User";

export default function UsersPage() {
  const router = useRouter();
  const { data: users, isLoading, error, refetch } = useFetch("http://localhost:8080/api/users", "GET");

  const goToUpdatePage = (id : string) => {
    router.push(`/users/update/${id}`);
  };

  const deleteUser = (id : string) => {
    fetch(`http://localhost:8080/api/users/${id}`, {
      method: "DELETE"
    }).then(refetch);
  };

  return (
    <div>
      <main className={styles.main}>
        <div className="container d-flex flex-column align-items-center">
          <h1 className="mb-5">User List</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>An error occurred while fetching users.</p>
          ) : users && users.length > 0 ? (
            <table className="table table-bordered text-white">
              <thead className="thead-light text-center align-middle">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Id</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userObj: User, index: number) => (
                  <tr key={userObj.id} className="text-center align-middle">
                    <th scope="row">{index + 1}</th>
                    <td>{userObj.id}</td>
                    <td>{userObj.username}</td>
                    <td>{userObj.email}</td>
                    <td>
                      <button type="button" className="btn btn-primary" onClick={() => goToUpdatePage(userObj.id)}>
                        Update
                      </button>
                      <button type="button" className="btn btn-danger m-3" onClick={() => deleteUser(userObj.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found.</p>
          )}
        </div>

      </main>
    </div>
  );
}
