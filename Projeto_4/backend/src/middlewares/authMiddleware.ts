// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../models/user';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'fallback-segredo', // Substitua pelo seu segredo para assinar o token
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await UserModel.findById(payload.userId);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const authenticateUser = passport.authenticate('jwt', { session: false });

export const handleAuthentication = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (error: any, user: any) => {
    if (error) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = user;
    return next();
  })(req, res, next);
};
