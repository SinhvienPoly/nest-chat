import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      email: string;
    }; // Replace 'any' with your actual user type if available
  }
}
