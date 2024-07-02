import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (event) => {
        event.preventDefault();

    const data = {
        Username: username,
        Password: password
    };
    fetch("https://moviesdb-6abb3284c2fb.herokuapp.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
              onLoggedIn(data.user, data.token);
            } else {
              alert("No such user");
            }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
};

return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        minLength={5}
        required 
        />
      </label>
      <label>
        Password:
        <input type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={5}
        required 
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};