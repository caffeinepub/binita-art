import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate({ to: "/admin" });
      } else {
        setError("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-display text-2xl tracking-widest uppercase text-foreground">
            Binita Art
          </h1>
          <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mt-2">
            Admin Portal
          </p>
          <div className="w-8 h-px bg-border mx-auto mt-4" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          data-ocid="admin.login.modal"
        >
          <div className="space-y-1.5">
            <Label
              htmlFor="username"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="rounded-none border-border bg-card font-body text-sm"
              data-ocid="admin.login.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="font-body text-xs tracking-widest uppercase text-muted-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="rounded-none border-border bg-card font-body text-sm"
              data-ocid="admin.password.input"
            />
          </div>

          {error && (
            <p
              className="font-body text-xs text-destructive"
              data-ocid="admin.login.error_state"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-body text-xs tracking-widest uppercase py-3 bg-foreground text-background hover:bg-foreground/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            data-ocid="admin.login.submit_button"
          >
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {loading ? "Signing In…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
