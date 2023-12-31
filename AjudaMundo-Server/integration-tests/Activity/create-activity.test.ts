import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../../src/app'
import { AppDataSource } from '../../src/data-source'
import { OngRepository } from '../../src/repositories/OngRepository'
import { OngService } from '../../src/modules/Ong'
import { UserRepository } from '../../src/repositories/UserRepository'
import { UserService } from '../../src/modules/User'
import { createLogger } from 'winston'

describe('POST Create Activity', () => {
  let activityData = {
    name: 'Teste',
    points: 20,
    description: 'Testando a description',
    mainImg: '',
    status: 0,
    ongId: 1,
    userId: null,
  }

  const logger = createLogger({
    silent: true,
  });

  let ongAuthToken: string;
  let userAuthToken: string;

  beforeAll(async () => {
    await AppDataSource.initialize();

    const entities = AppDataSource.entityMetadatas;

    for await (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
  
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
      );
    }

    await getOngAuthToken();
    await getUserAuthToken();
  })

  test('should create a new activity', async () => {
    const response = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    expect(response.status).toBe(200)
    expect(response.body.result).toHaveProperty('activityId')
    expect(response.body.result).toHaveProperty('name')
    expect(response.body.result).toHaveProperty('points')
    expect(response.body.result).toHaveProperty('description')
    expect(response.body.result).toHaveProperty('mainImg')
    expect(response.body.result).toHaveProperty('status')
  })

  test('should return error when try to create a new activity with invalid data', async () => {
    const response = await request(app).post('/activity').send({}).set('Authorization', `Bearer ${ongAuthToken}`);

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
    expect(response.body).toHaveProperty('message')
  })

  test('normal user should not be able to create a new activity', async () => {
    const response = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${userAuthToken}`);

    expect(response.status).toBe(428)
  })

  const getOngAuthToken = async () => {
    const ongRepository = new OngRepository(logger);
    const ongService = new OngService(ongRepository, logger);

    const testOngData = {
      name: 'Ong Integration Test',
      email: 'ong.integration.test@gmail.com',
      password: 'ong123',
    }

    let ong;

    try {
      ong = await ongService.findOngByEmail(testOngData.email);
      
    } catch (error: any) {
      if (error.message !== 'Ong não encontrada!') {
        throw new Error('Não foi possível pegar ong test');
      }

      ong = await ongService.createOng(testOngData);

      if(!ong) {
        throw new Error('Não foi criar nova ong de teste');
      }
    }
    
    const response = await request(app)
      .post('/ong/login')
      .send({
        email: testOngData.email,
        password: testOngData.password,
      });

    if(response.status !== 200) {
      throw new Error('Não foi possível logar na ong');
    }

    ongAuthToken = response.body.token;
  }

  const getUserAuthToken = async () => {
    const userRepository = new UserRepository(logger);
    const userService = new UserService(userRepository, logger);

    const testUserData = {
      name: 'User Integration Test',
      email: 'user.integration.test@gmail.com',
      password: 'user123',
    }

    let user;

    try {
      user = await userService.findUserByEmail(testUserData.email);
      
    } catch (error: any) {
      if (error.message !== 'Usuário não encontrado!') {
        throw new Error('Não foi possível pegar user test');
      }

      user = await userService.createUser(testUserData);

      if(!user) {
        throw new Error('Não foi criar nova user de teste');
      }
    }
    
    const response = await request(app)
      .post('/user/login')
      .send({
        email: testUserData.email,
        password: testUserData.password,
      });

    if(response.status !== 200) {
      throw new Error('Não foi possível logar na user');
    }

    userAuthToken = response.body.token;
  }

  afterAll(async () => {
    const entities = AppDataSource.entityMetadatas;

    for await (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
  
      await repository.query(
        `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`,
      );
    }

    await AppDataSource.destroy();
  });
})
