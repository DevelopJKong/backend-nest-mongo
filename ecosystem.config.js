module.exports = {
  apps: [
    {
      name: 'backend-nest-mongo',
      script: 'dist/main.js',
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart,
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      env: {
        // environment variable
        PORT: 80,
        NODE_ENV: 'production',
      },
    },
  ],
};
