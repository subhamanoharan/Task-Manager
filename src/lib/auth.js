import { SignJWT, jwtVerify } from 'jose'

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export const encrypt = (payload) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);

export const decrypt = (input) =>
  jwtVerify(input, key, { algorithms: ["HS256"]})
    .then(({payload}) => payload)

export default { encrypt, decrypt }
