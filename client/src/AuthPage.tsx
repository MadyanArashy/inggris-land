import { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    const email = data.email?.toString().trim();
    const password = data.password?.toString();
    const confirm = data['confirm-password']?.toString();
    const username = data.username?.toString().trim();
  
    // Basic validation
    if (!/\S+@\S+\.\S+/.test(email || '')) {
      alert("Invalid email format.");
      return;
    }
  
    if ((password?.length || 0) < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
  
    if (!isLogin) {
      if (!username) {
        alert("Username is required.");
        return;
      }
      if (password !== confirm) {
        alert("Passwords do not match.");
        return;
      }
    }
  
    console.log(isLogin ? 'Logging in...' : 'Registering...', data);
  
    // Send data to backend (example)
    fetch(`http://localhost:5000/auth/${isLogin ? 'login' : 'register'}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then(async res => {
        const response = await res.json();
        if (!res.ok) throw new Error(response.message || "Request failed");
        alert("Success!");
      })
      .catch(err => {
        console.error("Auth error:", err);
        alert(err.message || "Something went wrong.");
      });
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Login to your account' : 'Create a new account'}
          </h1>
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              name="username"
              type="text"
              placeholder="Username / Nickname"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {!isLogin && (
            <input
              name="confirm-password"
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input type="hidden" name="isLogin" value={+ isLogin} />
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
