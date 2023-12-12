import { OngType } from './interfaces'

import { OngRepository } from '../../repositories/OngRepository'
import { OngEntity } from '../../entities/Ong.entity'

import crypto from 'crypto'
import jwt from 'jsonwebtoken'

class OngService {
  constructor(private readonly ongRepository: OngRepository) {}

  async findAllOngs(): Promise<OngEntity[]> {
    try {
      const ongs = await this.ongRepository.getOngs()

      if (ongs) {
        return ongs
      } else {
        throw new Error('Erro ao consultar ongs')
      }
    } catch (error) {
      console.log('OngService.findAllOngs error', error)
      throw error
    }
  }

  async updateOng(ongId: number, ong: OngType): Promise<OngEntity> {
    try {
      const result = await this.ongRepository.updateOng(ongId, ong)

      return result
    } catch (error) {
      console.log('OngService.updateOng error', error)
      throw error
    }
  }

  async createOng(ong: OngType): Promise<OngEntity> {
    try {
      const formatedOng = {
        ...ong,
        password: await this.encryptPassword(ong.password),
      }

      const result = await this.ongRepository.saveOng(formatedOng)

      return result
    } catch (error) {
      console.log('OngService.createOng error', error)
      throw error
    }
  }

  async findOngById(ongId: number): Promise<OngEntity> {
    try {
      const result = await this.ongRepository.getOngById(ongId)

      if (result) {
        return result
      } else {
        throw new Error('Ong não encontrada!')
      }
    } catch (error) {
      console.log('OngService.findOngById error', error)
      throw error
    }
  }

  async findOngByEmail(email: string): Promise<OngEntity> {
    try {
      const result = await this.ongRepository.getOngByEmail(email)

      if (result) {
        return result
      } else {
        throw new Error('Ong não encontrada!')
      }
    } catch (error) {
      console.log('OngService.findOngByEmail error', error)
      throw error
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const ong = await this.findOngByEmail(email)

      const verifiedPassword = await this.verifyPassword(password, ong.password)

      if (!verifiedPassword) {
        throw new Error('Erro ao se autenticar!')
      }

      const key = process.env.JSON_WEB_TOKEN_KEY

      let token: string

      if (key) {
        token = jwt.sign({ email: ong.email }, key, { expiresIn: '1h' })
      } else {
        throw new Error('Erro ao se autenticar!')
      }

      return token
    } catch (error) {
      console.log('OngService.login error', error)
      throw error
    }
  }

  private async encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex')

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        resolve(salt + ':' + derivedKey.toString('hex'))
      })
    })
  }

  private async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':')
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        resolve(key === derivedKey.toString('hex'))
      })
    })
  }
}

export { OngService }
