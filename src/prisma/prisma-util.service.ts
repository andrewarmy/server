import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaUtilService {
    constructor(protected readonly prismaService: PrismaService) { }

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
