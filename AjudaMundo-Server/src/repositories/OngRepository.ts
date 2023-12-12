import { AppDataSource } from '../data-source'
import { OngEntity } from '../entities/Ong.entity'
import { OngType } from '../modules/Ong'

import { DeleteResult } from 'typeorm'

export class OngRepository {
  async getOngById(ongId: number): Promise<OngEntity | null> {
    try {
      console.log(`Iniciando consulta de ong pelo id: ${ongId}...`)
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const ong = await ongRepository.findOneBy({ ongId })

      console.log(`Retorno da consulta: ${ong}`)

      return ong
    } catch (error) {
      console.log('Erro ao realizar consulta de ong!', error)
      throw error
    }
  }

  async getOngByEmail(email: string): Promise<OngEntity | null> {
    try {
      console.log(`Iniciando consulta de ong pelo email: ${email}...`)
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const ong = await ongRepository.findOneBy({ email })

      console.log(`Retorno da consulta:`)
      console.log(ong)

      return ong
    } catch (error) {
      console.log('Erro ao realizar consulta de ong!', error)
      throw error
    }
  }

  async getOngs(): Promise<OngEntity[] | null> {
    try {
      console.log('Iniciando consulta de ongs...')
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const ongs = await ongRepository.find()

      console.log(`Retorno da consulta: ${ongs}`)

      return ongs
    } catch (error) {
      console.log('Erro ao realizar consulta de ongs!', error)
      throw error
    }
  }

  async saveOng(ong: OngType): Promise<OngEntity> {
    try {
      console.log('Iniciando registro de nova ong...')
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const response = await ongRepository.save(ong)

      console.log(`Retorno da consulta: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar cadastro de ong!', error)
      throw error
    }
  }

  async updateOng(ongId: number, ong: OngType): Promise<OngEntity> {
    try {
      console.log(`Iniciando update de ong com id: ${ongId}...`)
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const response = await ongRepository.save({
        ongId,
        ...ong,
      })

      console.log(`Retorno do update: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar update de ong!', error)
      throw error
    }
  }

  async deleteOng(ongId: number): Promise<DeleteResult> {
    try {
      console.log(`Iniciando exclusão de ong pelo id: ${ongId}...`)
      const ongRepository = AppDataSource.getRepository(OngEntity)

      const response = await ongRepository.delete({ ongId })

      console.log(`Retorno da exclusão: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar exclusão de ong!', error)
      throw error
    }
  }
}
