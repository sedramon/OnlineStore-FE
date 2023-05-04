import { useRouter } from "next/router";
import { useEffect, useState } from "react"

export default function UpdatePage() {
      const router = useRouter();
      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(true);
      const [userId, setUserId] = useState(null);
      const [error, setError] = useState("");
      const [data, setData] = useState([]);

      useEffect(() => {
            const fetchUser = async () => {
              if (router.query.user_id) {
                try {
                  const response = await fetch(`http://localhost:8080/api/users/${router.query.user_id}`);
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  setUserId(data.id);
                  setUsername(data.username);
                  setEmail(data.email);
                  setPassword(data.password);
                  setLoading(false);
                } catch (error) {
                  console.error('Fetch user error:', error);
                  throw new Error('Failed to fetch user');
                }
              }
            };
            fetchUser();
          }, [router.query.user_id]);


          const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const updatedUser = { username: username, email: email, password: password };
              const response = await fetch(`http://localhost:8080/api/users/${router.query.user_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
              });
              if (response.ok) {
                router.push(`/users`);
        
              } else {
                setError("Failed to update user.");
              }
        
          };


          if (loading) {
            return <div>Loading...</div>;
          }
        
          if (error) {
            return <div>{error}</div>;
          }


          return (
            <div 
            className={"container d-flex flex-column justify-content-center align-items-center border rounded p-3"}
            style={{ 
              height: 500, 
              width: 500,
              marginTop: 50,
              marginBottom: 50
              }}>
              <h1>Update User</h1>
              <form 
              onSubmit={handleSubmit}
              className={"d-flex flex-column"}>
                <label>
                  Name:
                  <input
                  className="form-control"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </label>
                <br />
                <label>
                  Password:
                  <input
                  className="form-control"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </label>
                <br />
                <button 
                type="submit"
                className="form-control">Update</button>
              </form>
            </div>
          );
}