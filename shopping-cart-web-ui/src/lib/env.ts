const env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string,
  API_URL: process.env.API_URL as string,
  USER_ROLE: process.env.USER_ROLE as string,
  JWT_SECRET: process.env.JWT_SECRET as string,

  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env
    .NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,

  STRIPE_SCERET_KEY: process.env.STRIPE_SCERET_KEY as string,
};

export default env;
