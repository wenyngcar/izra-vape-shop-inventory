import * as React from "react";
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
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

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
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-white neon-text">
                  Username
                </Label>
                <Input
                  id="name"
                  placeholder="Username"
                  className="bg-transparent border-2 border-gray-500 text-white my-neon-input"
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
                    className="pr-10 bg-transparent border-2 border-gray-500 text-white my-neon-input"
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="neon-button">
            <Link to="/Home">Log In</Link>
          </Button>
          <a
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
