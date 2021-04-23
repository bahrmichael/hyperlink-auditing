export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'analytics'
      }
    }
  ],
  environment: {
    TABLE_NAME: {Ref: 'TransitionsTable'},
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:Query'],
      Resource: {'Fn::GetAtt': ['TransitionsTable', 'Arn']}
    },
  ],
}
