export default {
  apps: [
    {
      name: 'api',
      script: './bin/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true
    }
  ]
}
