import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);

// Hard-coded admin credentials for enhanced security  
const ADMIN_USERNAME = "safiyan.khan";
const ADMIN_PASSWORD = "yNKyNGC4"; // Direct password for simplicity in demo

interface User {
  id: number;
  username: string;
  role: string;
}

// Store a single admin user
const adminUser: User = {
  id: 1,
  username: ADMIN_USERNAME,
  role: "admin"
};

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "desert-jewel-realty-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    cookie: {
      maxAge: 3600000, // Session expires after 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    }
  };

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Passport
  passport.use(
    new LocalStrategy((username, password, done) => {
      try {
        // Only validate against our single admin user
        if (username !== ADMIN_USERNAME) {
          return done(null, false, { message: "Invalid username or password" });
        }

        // Simple direct password comparison for demo
        if (password !== ADMIN_PASSWORD) {
          return done(null, false, { message: "Invalid username or password" });
        }
        
        return done(null, adminUser);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user: Express.User, done) => {
    done(null, (user as User).id);
  });

  passport.deserializeUser((id: number, done) => {
    // Only one user in the system
    if (id === adminUser.id) {
      done(null, adminUser);
    } else {
      done(new Error("User not found"), null);
    }
  });

  // API Routes for authentication
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: info.message || "Authentication failed" });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({ 
          id: user.id,
          username: user.username,
          role: user.role
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = req.user as User;
    res.json({
      id: user.id,
      username: user.username,
      role: user.role
    });
  });

  // Middleware to check if user is admin
  app.use("/api/admin/*", (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const user = req.user as User;
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Administrator access required" });
    }
    next();
  });
}

// Middleware for checking authentication in routes
export function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication required" });
}

// Middleware for checking admin role
export function isAdmin(req: any, res: any, next: any) {
  if (req.isAuthenticated() && (req.user as User).role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Administrator access required" });
}