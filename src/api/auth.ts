import client from "./client";

const login = (code, state) => client.post("/auth/tokens", { code, state });

export default {
  login,
};
