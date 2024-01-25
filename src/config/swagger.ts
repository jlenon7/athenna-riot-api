export default {
  summoners: {
    index: {
      200: {
        description: 'Return multiple summoners profiles paginated.',
        type: 'object',
        properties: {
          meta: {
            type: 'object',
            properties: {
              itemCount: { type: 'number' },
              totalItems: { type: 'number' },
              totalPages: { type: 'number' },
              currentPage: { type: 'number' },
              itemsPerPage: { type: 'number' }
            }
          },
          links: {
            type: 'object',
            properties: {
              first: { type: 'string' },
              previous: { type: 'string' },
              next: { type: 'string' },
              last: { type: 'string' }
            }
          },
          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                region: { type: 'string' },
                nickname: { type: 'string' },
                summonerId: { type: 'string' },
                accountId: { type: 'string' },
                puuid: { type: 'string' },
                ranks: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      summonerId: { type: 'string' },
                      leagueId: { type: 'string' },
                      tier: { type: 'string' },
                      rank: { type: 'string' },
                      pdl: { type: 'string' },
                      queueType: { type: 'string' },
                      winrate: { type: 'string' },
                      leaguePoints: { type: 'number' },
                      wins: { type: 'number' },
                      losses: { type: 'number' },
                      inactive: { type: 'boolean' },
                      veteran: { type: 'boolean' },
                      hotStreak: { type: 'boolean' },
                      freshBlood: { type: 'boolean' },
                      season: { type: 'string' },
                      createdAt: { type: 'string' },
                      updatedAt: { type: 'string' },
                      deletedAt: { type: 'string' }
                    }
                  }
                },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' },
                deletedAt: { type: 'string' }
              }
            }
          }
        }
      }
    },
    show: {
      200: {
        description: 'Return one summoner profile.',
        properties: {
          id: { type: 'string' },
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
          id: { type: 'string' },
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
    update: {
      200: {
        description: 'Return the updated summoner profile.',
        properties: {
          id: { type: 'string' },
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
    delete: {
      204: {
        description: 'Delete a summoner profile.',
        properties: {}
      }
    }
  }
}
