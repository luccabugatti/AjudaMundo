import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../../src/app'
import { AppDataSource } from '../../src/data-source'
import { OngRepository } from '../../src/repositories/OngRepository'
import { OngService } from '../../src/modules/Ong'
import { UserRepository } from '../../src/repositories/UserRepository'
import { UserService } from '../../src/modules/User'
import { createLogger } from 'winston'

describe('PATCH Update Activity', () => {
  let activityData = {
    name: 'Teste',
    points: 20,
    description: 'Testando a description',
    mainImg: '',
    status: 0,
    ongId: 1,
    userId: null
  }

  const logger = createLogger({
    silent: true,
  });

  let ongAuthToken: string;
  let secondOngAuthToken: string;
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
    await getSecondOngAuthToken();
    await getUserAuthToken();
  })

  test('should update an activity', async () => {
    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    const updateData = {
      name: 'Teste 2'
    }

    const response = await request(app).patch(`/activity/${createdActivity.body.result.activityId}`).send(updateData).set('Authorization', `Bearer ${ongAuthToken}`);

    expect(response.status).toBe(200)
    expect(response.body.result).toHaveProperty('activityId')
    expect(response.body.result.name).toBe('Teste 2')
  })

  test('ong should not update an activity that is not theirs', async () => {
    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    const updateData = {
      name: 'Teste 2'
    }

    const response = await request(app).patch(`/activity/${createdActivity.body.result.activityId}`).send(updateData).set('Authorization', `Bearer ${secondOngAuthToken}`);

    expect(response.status).toBe(403)
    expect(response.body.message).toBe('Somente a ong que criou a atividade pode atualizá-la')
  })

  test('user should not update an activity', async () => {
    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    const updateData = {
      name: 'Teste 2'
    }

    const response = await request(app).patch(`/activity/${createdActivity.body.result.activityId}`).send(updateData).set('Authorization', `Bearer ${userAuthToken}`);

    expect(response.status).toBe(428)
  })

  test('should not update a done activity', async () => {
    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    const updateData = {
      name: 'Teste 2'
    }

    await request(app).post(`/activity/assign/${createdActivity.body.result.activityId}`).set('Authorization', `Bearer ${userAuthToken}`);

    await request(app).post(`/activity/do/${createdActivity.body.result.activityId}`).send({ realizationField: 'Testando o feito' }).set('Authorization', `Bearer ${userAuthToken}`);

    const response = await request(app).patch(`/activity/${createdActivity.body.result.activityId}`).send(updateData).set('Authorization', `Bearer ${ongAuthToken}`);

    expect(response.status).toBe(409)
    expect(response.body.message).toBe('Atividades finalizadas não podem ser alteradas')
  })

  test('should not update an assigned activity', async () => {
    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    const updateData = {
      name: 'Teste 2'
    }

    await request(app).post(`/activity/assign/${createdActivity.body.result.activityId}`).set('Authorization', `Bearer ${userAuthToken}`);

    const response = await request(app).patch(`/activity/${createdActivity.body.result.activityId}`).send(updateData).set('Authorization', `Bearer ${ongAuthToken}`);

    expect(response.status).toBe(409)
    expect(response.body.message).toBe('Atividades atribuídas não podem ser alteradas')
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

  const getSecondOngAuthToken = async () => {
    const ongRepository = new OngRepository(logger);
    const ongService = new OngService(ongRepository, logger);

    const testOngData = {
      name: 'Ong Integration Test 2',
      email: 'ong.integration.test2@gmail.com',
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

    secondOngAuthToken = response.body.token;
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
