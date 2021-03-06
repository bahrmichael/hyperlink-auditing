export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'ping'
      }
    }
  ],
  environment: {
    TABLE_NAME: {Ref: 'TransitionsTable'},
  },
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:PutItem'],
      Resource: {'Fn::GetAtt': ['TransitionsTable', 'Arn']}
    },
  ],
}
