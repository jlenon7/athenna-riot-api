export default {
  apps: [
    {
      name: 'api',
      script: './main.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true
    }
  ]
}
