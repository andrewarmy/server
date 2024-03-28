import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaUtilService } from 'src/prisma/prisma-util.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCycleDto, CycleContactDto } from './dto/create-cycle.dto';
import { UpdateCycleDto } from './dto/update-cycle.dto';

@Injectable()
export class CycleService extends PrismaUtilService {

    constructor(protected readonly prismaService: PrismaService) {
        super({
            prismaService: prismaService.cycle,
            selectColumns: { id: true, name: true, start_date: true, end_date: true },
            smartSearch: {
                name: 'string',
                start_date: 'date',
                end_date: 'date'
            }
        })
    }

    async create({ PolicesInCycles, IndividualsInCycle, CiviliansInCycles, ...createCycle }: CreateCycleDto) {
        try {
            return await this.prismaService.cycle.create({
                data: {
                    ...createCycle,
                    PolicesInCycles: {
                        create: PolicesInCycles.map(({ id }) => ({
                            police_id: id,
                            assigned_at: new Date()
                        }))
                    },
                    IndividualsInCycle: {
                        create: IndividualsInCycle.map(({ id }) => ({
                            individual_id: id,
                            assigned_at: new Date()
                        }))
                    },
                    CiviliansInCycles: {
                        create: CiviliansInCycles.map(({ id }) => ({
                            civilian_id: id,
                            assigned_at: new Date()
                        }))
                    },
                }
            })
        } catch (e) {
            console.log(e)
            throw new BadRequestException()
        }
    }

    async update(id: number, data: UpdateCycleDto) {
        const { PolicesInCycles, IndividualsInCycle, CiviliansInCycles, ...updateCycleDto } = data
        await this.contactSyncInCycle(id, { PolicesInCycles, IndividualsInCycle, CiviliansInCycles })

        try {
            return await this.prismaService.cycle.update({
                data: updateCycleDto,
                where: { id }
            })
        } catch (e) {
            console.log(e)
            throw new BadRequestException()
        }
    }

    async contactSyncInCycle(cycleId: number, data: CycleContactDto) {
        const contactKeys = {
            PolicesInCycles: 'police_id',
            IndividualsInCycle: 'individual_id',
            CiviliansInCycles: 'civilian_id',
        }
        try {
            const cycleContacts = await this.prismaService.cycle.findFirst({
                where: { id: cycleId },
                select: {
                    PolicesInCycles: { select: { police_id: true } },
                    CiviliansInCycles: { select: { civilian_id: true } },
                    IndividualsInCycle: { select: { individual_id: true } },
                }
            })
            for (const contactKey of Object.keys(contactKeys)) {
                const givenData = data[contactKey]
                const keyId = contactKeys[contactKey]
                const newData = givenData.filter(item =>
                    !cycleContacts[contactKey].find(
                        (itemCycle) => itemCycle[keyId] == item.id)
                ).map((item) => item.id);

                const deletedData = cycleContacts[contactKey].filter((itemCycle) =>
                    !givenData.find((policeCycle) => policeCycle.id == itemCycle[keyId])
                ).map((item) => item[keyId])
                if (newData.length)
                    await this.prismaService.cycle.update({
                        where: { id: cycleId },
                        data: {
                            [contactKey]: {
                                createMany: { data: newData.map((dataId) => ({ [keyId]: dataId, assigned_at: new Date() })) }
                            }
                        }
                    })
                if (deletedData.length) {
                    const model = `${contactKey[0].toLocaleUpperCase()}${contactKey.slice(1)}`
                    await this.prismaService[model]?.deleteMany({
                        where: { cycle_id: cycleId, [keyId]: { in: deletedData } }
                    })
                }

            }
        } catch (e) {
            console.log(e)
        }

    }
}
