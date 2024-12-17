import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import * as api from "@/utils/api.js";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For showing error messages
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check credentials
    api.login({ username, password }).then((json: any) => {
      const isValid = json.message;
      if (isValid) {
        setError(""); // Clear previous errors
        navigate("/Home"); // Redirect to Home
      } else {
        setError("Invalid username or password. Please try again.");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-[350px] bg-transparent border-2 border-gray-700 rounded-lg p-6 relative">
        <CardHeader>
          <CardTitle className="text-2xl text-white neon-text">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-400">
            Please enter your details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username" className="text-white neon-text">
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="Username"
                  className="bg-transparent border-2 border-gray-500 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-white neon-text">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="pr-10 bg-transparent border-2 border-gray-500 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-white neon-icon" />
                    ) : (
                      <Eye className="h-5 w-5 text-white neon-icon" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="relative">
                  {error && (
                    <p className="text-red-500 text-sm mt-2 ">{error}</p>
                  )}

                  <Button type="submit" className="neon-button mt-2">
                    Log In
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
