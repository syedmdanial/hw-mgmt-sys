const production = {
  urls: {
    api_base_url: "https://my-json-server.typicode.com/syedmdanial/json-server", // Production server
    api_messages_documentation:
      "https://my-json-server.typicode.com/syedmdanial/json-server",
  },

  // REDUX STORE PERSIST CONFIG
  persistConfig: {
    key: "HW-MGMT-SYS-PROD",
  },

  jwtSecret: "sYeDmDaNiaLJWTSeCrEt==",
};

const development = {
  urls: {
    api_base_url: "http://localhost:3001", // Staging server
    // api_base_url: "https://my-json-server.typicode.com/syedmdanial/json-server", // Staging server
    api_messages_documentation:
      "https://my-json-server.typicode.com/syedmdanial/json-server",
  },

  // REDUX STORE PERSIST CONFIG
  persistConfig: {
    key: "HW-MGMT-SYS-STAG",
  },

  subjects: [
    { label: "Math", value: "math" },
    { label: "English", value: "english" },
    { label: "Science", value: "science" },
    { label: "History", value: "history" },
    { label: "Art", value: "art" },
    { label: "Geography", value: "geography" },
  ],

  jwtSecret: "sYeDmDaNiaLJWTSeCrEt==",
};

const config =
  process.env.NODE_ENV === "development" ? development : production;

export default config;
