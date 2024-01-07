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
};

const development = {
  urls: {
    api_base_url: "https://my-json-server.typicode.com/syedmdanial/json-server", // Staging server
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
};

const config =
  process.env.NODE_ENV === "development" ? development : production;

export default config;
