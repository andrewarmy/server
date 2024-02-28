import { SetMetadata } from "@nestjs/common";

// enable anyone not have a jwt token to access this route
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);