// import { jwtVerify } from "jose";
// import { NextRequest, NextResponse } from "next/server";
// import env from "./lib/env";

// export const middleware = async (request: NextRequest) => {
//   const cookiesToken = request.cookies.get("directus_session_token")?.value;

//   const secret = new TextEncoder().encode(env.JWT_SECRET);

//   if (cookiesToken === undefined || cookiesToken === "") {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   try {
//     await jwtVerify(cookiesToken, secret);

//     return NextResponse.next();
//   } catch (error) {
//     console.log(error);

//     const customResponse = NextResponse.redirect(
//       new URL("/auth/login", request.url),
//     );

//     customResponse.cookies.delete("directus_session_token");

//     return customResponse;
//   }
// };

// export const config = {
//   matcher: ["/shopping-cart"],
// };

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import env from "./lib/env";

export const middleware = async (request: NextRequest) => {
  const cookiesToken = request.cookies.get("directus_session_token")?.value;

  const secret = new TextEncoder().encode(env.JWT_SECRET);

  if (cookiesToken === undefined || cookiesToken === "") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    await jwtVerify(cookiesToken, secret);

    return NextResponse.next();
  } catch (error) {
    console.log(error);

    const customResponse = NextResponse.redirect(
      new URL("/auth/login", request.url),
    );

    customResponse.cookies.delete("directus_session_token");

    return customResponse;
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/shopping-cart", "/payment", "/payment/success", "/profile"],
};
