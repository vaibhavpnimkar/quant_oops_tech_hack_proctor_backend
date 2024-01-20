import ExamLog from '../../../models/exam.log.model'
import { ExamLogTypes } from '../../../enums/ExamLogTypes'

class LiveExamLogRepository {
    async find(filter: {}) {
        return ExamLog.findOne({
            where: filter,
        })
    }

    async submitQuestion(data: any) {
        return ExamLog.create(data)
    }

    async updateSubmittedQuestion(id: number, data: any) {
        await ExamLog.update(data, {
            where: {
                id,
            },
        })

        return await ExamLog.findOne({
            where: {
                id,
            },
        })
    }

    async getSubmittedQuestions(examId: number, studentId: number) {
        return ExamLog.findOne({
            where: {
                examId,
                studentId,
                logType: ExamLogTypes.QuestionAnswered,
            },
        })
    }
}

export default new LiveExamLogRepository()