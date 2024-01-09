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
          summonerId: { type: 'string' },
          accountId: { type: 'string' },
          puuid: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          deletedAt: { type: 'string' }
        }
      }
    },

    show: {
      200: {
        description: 'Return one summoner profile.',
        properties: {
          id: { type: 'integer' },
          region: { type: 'string' },
          nickname: { type: 'string' },
          summonerId: { type: 'string' },
          accountId: { type: 'string' },
          puuid: { type: 'string' },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
          deletedAt: { type: 'string' }
        }
      }
    },

    store: {
      201: {
        description: 'Return the created summoner profile.',
        properties: {
          id: { type: 'integer' },
          region: { type: 'string' },
          nickname: { type: 'string' },
          summonerid: { type: 'string' },
          accountid: { type: 'string' },
          puuid: { type: 'string' },
          createdat: { type: 'string' },
          updatedat: { type: 'string' },
          deletedat: { type: 'string' }
        }
      }
    },

    update: {
      200: {
        description: 'Return the updated summoner profile.',
        properties: {
          id: { type: 'integer' },
          region: { type: 'string' },
          nickname: { type: 'string' },
          summonerid: { type: 'string' },
          accountid: { type: 'string' },
          puuid: { type: 'string' },
          createdat: { type: 'string' },
          updatedat: { type: 'string' },
          deletedat: { type: 'string' }
        }
      }
    }
  }
}
