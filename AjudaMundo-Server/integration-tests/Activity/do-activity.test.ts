import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import request from 'supertest'
import { app } from '../../src/app'
import { AppDataSource } from '../../src/data-source'
import { OngRepository } from '../../src/repositories/OngRepository'
import { OngService } from '../../src/modules/Ong'
import { UserRepository } from '../../src/repositories/UserRepository'
import { UserService } from '../../src/modules/User'
import { createLogger } from 'winston'

describe('POST Do Activity', () => {
  let ongAuthToken: string;
  let userAuthToken: string;
  let secondUserAuthToken: string;

  const logger = createLogger({
    silent: true,
  });

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
    await getSecondUserAuthToken();
  })

  test('user should be able to finish their activity', async () => {
    let activityData = {
      name: 'Teste',
      points: 20,
      description: 'Testando a description',
      mainImg: '',
      status: 0,
      ongId: 1,
      userId: null,
    }

    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    await request(app).post(`/activity/assign/${createdActivity.body.result.activityId}`).set('Authorization', `Bearer ${userAuthToken}`);

    const response = await request(app).post(`/activity/do/${createdActivity.body.result.activityId}`).send({ realizationField: 'Testando o feito' }).set('Authorization', `Bearer ${userAuthToken}`);

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("Atividade realizada com sucesso!")
  })

  test('user should not finish an activity that is not assigned to them', async () => {
    let activityData = {
      name: 'Teste',
      points: 20,
      description: 'Testando a description',
      mainImg: '',
      status: 0,
      ongId: 1,
      userId: null,
    }

    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    await request(app).post(`/activity/assign/${createdActivity.body.result.activityId}`).set('Authorization', `Bearer ${userAuthToken}`);

    const response = await request(app).post(`/activity/do/${createdActivity.body.result.activityId}`).send({ realizationField: 'Testando o feito' }).set('Authorization', `Bearer ${secondUserAuthToken}`);

    expect(response.status).toBe(403)
    expect(response.body.message).toBe("Somente o usuário atribuído à atividade pode finaliza-la")
  })

  test('user should no finish an activity that is already finished', async () => {
    let activityData = {
      name: 'Teste',
      points: 20,
      description: 'Testando a description',
      mainImg: '',
      status: 0,
      ongId: 1,
      userId: null,
    }

    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    await request(app).post(`/activity/assign/${createdActivity.body.result.activityId}`).set('Authorization', `Bearer ${userAuthToken}`);

    await request(app).post(`/activity/do/${createdActivity.body.result.activityId}`).send({ realizationField: 'Testando o feito' }).set('Authorization', `Bearer ${userAuthToken}`);

    const response = await request(app).post(`/activity/do/${createdActivity.body.result.activityId}`).send({ realizationField: 'Testando o feito' }).set('Authorization', `Bearer ${userAuthToken}`);

    expect(response.status).toBe(409)
    expect(response.body.message).toBe("Atividade já finalizada")
  })

  test('ong should not be able to finish an activity', async () => {
    let activityData = {
      name: 'Teste',
      points: 20,
      description: 'Testando a description',
      mainImg: '',
      status: 0,
      ongId: 1,
      userId: null,
    }

    const createdActivity = await request(app).post('/activity').send(activityData).set('Authorization', `Bearer ${ongAuthToken}`);

    await request(app).post(`/activity/assign/${createdActivity.body.result.activityId}`).set('Authorization', `Bearer ${userAuthToken}`);

    const response = await request(app).post(`/activity/do/${createdActivity.body.result.activityId}`).send({ realizationField: 'Testando o feito' }).set('Authorization', `Bearer ${ongAuthToken}`);

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

  const getSecondUserAuthToken = async () => {
    const userRepository = new UserRepository(logger);
    const userService = new UserService(userRepository, logger);

    const testUserData = {
      name: 'User Integration Test 2',
      email: 'user.integration.test2@gmail.com',
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

    secondUserAuthToken = response.body.token;
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
