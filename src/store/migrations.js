const migrations = {
  0: (state) => ({
    // Keep only auth state
    auth: state.auth,
  }),
  1: (state) => ({}), // Update whole store
  2: (state) => ({}),
  3: (state) => ({}),
  4: (state) => ({}),
  5: (state) => ({
    auth: state.auth,
  }),
};

export default migrations;
