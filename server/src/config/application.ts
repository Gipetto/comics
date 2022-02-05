const config = {
  currentEnv: process.env.NODE_ENV || "development",
  express: {
    port: 3000
  },
  static: {
    dir: "/usr/src/app/public" // only in docker container
  },
  jwt: {
    token_key: process.env.JWT_TOKEN_KEY || "fake_key",
    options: {
      expiresIn: "1d"
    }
  }
}

export default config
