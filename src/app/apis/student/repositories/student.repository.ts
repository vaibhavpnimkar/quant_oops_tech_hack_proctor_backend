import User from '../../../models/user.model'
import { Roles } from '../../../enums/Roles'
import Exam from '../../../models/exam.model'

class StudentRepository {
    async find(filter: {}) {
        return User.findOne({
            where: filter,
        })
    }

    async findAll(filter: {}) {
        return User.findAll({
            where: filter,
        })
    }

    async create(data: any) {
        return User.create(data)
    }

    async getAllStudents(limit: number, offset: number, organizationId: number) {
        return User.findAndCountAll({
            where: {
                role: Roles.STUDENT,
                organizationId,
            },
            limit,
            offset,
        })
    }

    async getAllExamStudents(examId: number, organizationId: number) {
        return User.findAndCountAll({
            where: {
                role: Roles.STUDENT,
                organizationId,
            },
            include: [
                {
                    model: Exam,
                    as: 'exams',
                    where: {
                        id: examId,
                    },
                    attributes: ['id'],
                },
            ],
        })
    }
}

export default new StudentRepository()