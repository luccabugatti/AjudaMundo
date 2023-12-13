import { Logger } from 'winston'
import { AppDataSource } from '../data-source'
import { OngEntity } from '../entities/Ong.entity'
import { OngType } from '../modules/Ong'

import { DeleteResult } from 'typeorm'

export class OngRepository {
  constructor(private readonly logger: Logger) {}

  async getOngById(ongId: number): Promise<OngEntity | null> {
    try {
      this.logger.debug(`Iniciando consulta de ong pelo id: ${ongId}...`)
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const ong = await ongRepository.findOneBy({ ongId })

      this.logger.debug(`Retorno da consulta: ${ong}`)

      return ong
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de ong!', error)
      throw error
    }
  }

  async getOngByEmail(email: string): Promise<OngEntity | null> {
    try {
      this.logger.debug(`Iniciando consulta de ong pelo email: ${email}...`)
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const ong = await ongRepository.findOneBy({ email })

      this.logger.debug(`Retorno da consulta:`)
      this.logger.debug(ong)

      return ong
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de ong!', error)
      throw error
    }
  }

  async getOngs(): Promise<OngEntity[] | null> {
    try {
      this.logger.debug('Iniciando consulta de ongs...')
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const ongs = await ongRepository.find()

      this.logger.debug(`Retorno da consulta: ${ongs}`)

      return ongs
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de ongs!', error)
      throw error
    }
  }

  async saveOng(ong: OngType): Promise<OngEntity> {
    try {
      this.logger.debug('Iniciando registro de nova ong...')
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const response = await ongRepository.save(ong)

      this.logger.debug(`Retorno da consulta: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar cadastro de ong!', error)
      throw error
    }
  }

  async updateOng(ongId: number, ong: OngType): Promise<OngEntity> {
    try {
      this.logger.debug(`Iniciando update de ong com id: ${ongId}...`)
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const response = await ongRepository.save({
        ongId,
        ...ong,
      })

      this.logger.debug(`Retorno do update: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar update de ong!', error)
      throw error
    }
  }

  async deleteOng(ongId: number): Promise<DeleteResult> {
    try {
      this.logger.debug(`Iniciando exclusão de ong pelo id: ${ongId}...`)
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const response = await ongRepository.delete({ ongId })

      this.logger.debug(`Retorno da exclusão: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar exclusão de ong!', error)
      throw error
    }
  }
}
