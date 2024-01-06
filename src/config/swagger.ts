export default {
  summoners: {
    index: {
      200: {
        description: 'Return multiple summoners profiles.',
        type: 'array',
        properties: {
          id: { type: 'integer' },
          region: { type: 'string' },
          nickname: { type: 'string' },
          accountId: { type: 'string' },
          puuid: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          deletedAt: { type: 'string' }
        }
      }
    },
    store: {
      200: {
        description: 'Return the created summoner profile.',
        properties: {
          id: { type: 'integer' },
          region: { type: 'string' },
          nickname: { type: 'string' },
          accountId: { type: 'string' },
          puuid: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          deletedAt: { type: 'string' }
        }
      }
    }
  }
}
