export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: ''
      }
    },
    {
      http: {
        method: 'get',
        path: 'about-me'
      }
    },
    {
      http: {
        method: 'get',
        path: 'blog'
      }
    },
    {
      http: {
        method: 'get',
        path: 'no-audit'
      }
    }
  ]
}
