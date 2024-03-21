import { NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';

type SmartSearchType = Record<string, 'string' | 'date' | 'number'>
interface PrismaUtilConfig {
    prismaService: any;
    selectColumns: Record<string, any>,
    smartSearch?: SmartSearchType
}

export class PrismaUtilService {
    constructor(protected readonly prismaConfig: PrismaUtilConfig) { }

    async findAll({ skip, take, search, where = {} }: FilterQueryProps) {
        const { prismaService, selectColumns, smartSearch } = this.prismaConfig
        const whereSearchQuery = smartSearch ? this.smartSearchQuery(search, smartSearch) : {}
        const data = await prismaService.findMany({
            skip,
            take,
            where: {
                AND: [
                    where,
                    whereSearchQuery
                ]
            },
            select: selectColumns
        })

        return {
            data,
            total: (await prismaService.count({ where }))
        }
    }

    async findOne(id: number) {
        const { prismaService } = this.prismaConfig
        const data = await prismaService.findUnique({ where: { id } })
        if (!data) throw new NotFoundException()
        return data
    }

    async remove(ids: number[]) {
        const { prismaService } = this.prismaConfig
        for (const id of ids) {
            await this.findOne(id)
            await prismaService.delete({
                where: { id }
            })
        }
        return 'deleted'
    }


    smartSearchQuery(search: string, searchFields: SmartSearchType) {
        const where = { OR: [] }
        if (search && searchFields) {
            const searchTerm = search.toLowerCase()
            for (const searchField of Object.keys(searchFields)) {
                const typeField = searchFields[searchField]
                let fieldQuery = {}
                switch (typeField) {
                    case "string":
                        fieldQuery = { contains: searchTerm }
                        break
                    case "date":
                        console.log('yes', searchField, searchTerm)
                        const date = dayjs(searchTerm)
                        if (!date.isValid()) continue;
                        fieldQuery = { equals: date.toISOString() }
                        break
                    case 'number':
                        fieldQuery = { equals: +searchTerm }
                        break;
                }
                where.OR.push({ [searchField]: fieldQuery })
            }
            if (!isNaN(+searchTerm)) {
                where.OR.push({
                    id: {
                        equals: +searchTerm,
                    },
                })
            }
        }
        return where
    }
}
