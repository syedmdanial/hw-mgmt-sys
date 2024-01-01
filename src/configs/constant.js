const production = {
  urls: {
    api_base_url: 'https://www.google.com/', // Production server
    api_messages_documentation: 'https://www.google.com/',
  },

  // REDUX STORE PERSIST CONFIG
  persistConfig: {
    key: 'HW-MGMT-SYS-PROD',
  },
};

const development = {
  urls: {
    api_base_url: 'https://www.google.com/', // Staging server
    api_messages_documentation: 'https://www.google.com/',
  },

  // REDUX STORE PERSIST CONFIG
  persistConfig: {
    key: 'HW-MGMT-SYS-STAG',
  },
};

const config =
  process.env.NODE_ENV === 'development' ? development : production;

export default config;
