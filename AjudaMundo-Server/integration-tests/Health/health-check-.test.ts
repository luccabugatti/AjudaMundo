import { describe, expect, test } from '@jest/globals'
import { app } from '../../src/app'
import request from 'supertest'

describe('GET Health', () => {
  test('should be able to get health check', async () => {
    const response = await request(app)
      .get('/health')

    expect(response.status).toBe(200)
  })
})
