import { NotFoundException } from '@nestjs/common';

interface PrismaUtilConfig {
    prismaService: any;
    selectColumns: Record<string, any>
}

export class PrismaUtilService {
    constructor(protected readonly prismaConfig: PrismaUtilConfig) { }

    async findAll({ skip, take, search }: FilterQueryProps) {
        const { prismaService, selectColumns } = this.prismaConfig
        const where = this.searchQuery(search, Object.keys(selectColumns))
        const data = await prismaService.findMany({
            skip,
            take,
            where,
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


    searchQuery(search: string, searchFields: string[]) {
        let where = {}
        if (search) {
            const searchTerm = search.toLowerCase()
            const queryFields: any[] = searchFields.map((field) => ({ [field]: { contains: searchTerm } }))
            if (!isNaN(+searchTerm)) {
                queryFields.push({
                    id: {
                        equals: +searchTerm,
                    },
                })
            }
            where = { OR: queryFields }
        }
        return where
    }
}
