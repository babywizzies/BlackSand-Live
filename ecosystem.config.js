module.exports = {
    apps: [
      {
        name: "blacksand-web",
        script: "npm",
        args: "start",
        env: {
          NODE_ENV: "production",
          PORT: 3077, // You can specify another port if you want
        },
        exec_mode: "cluster",
        instances: "1", // This will run the app on all available CPU cores
      },
    ],
  };
  