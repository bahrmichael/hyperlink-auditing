import type { AWS } from '@serverless/typescript';

import { ping, website, analytics } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'hyperlink-auditing',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack', 'serverless-iam-roles-per-function'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { ping, website, analytics },
  resources: {
    Resources: {
      TransitionsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          BillingMode: 'PAY_PER_REQUEST',
          KeySchema: [{
            AttributeName: 'id',
            KeyType: 'HASH'
          }, {
            AttributeName: 'date',
            KeyType: 'RANGE'
          }],
          AttributeDefinitions: [{
            AttributeName: 'id',
            AttributeType: 'S'
          }, {
            AttributeName: 'date',
            AttributeType: 'S'
          }],
        }
      },
    }
  }
}

module.exports = serverlessConfiguration;
