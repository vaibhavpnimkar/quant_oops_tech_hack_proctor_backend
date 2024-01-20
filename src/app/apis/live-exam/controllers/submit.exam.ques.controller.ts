import asyncHandler from '../../../utils/AsyncHandler'
import { UserRequest } from '../../../common/interfaces'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { StatusCodes } from '../../../enums/StatusCodes'
import { Response } from 'express'
import liveExamService from '../services/live.exam.service'
import { ISubmitExamQues } from '../interfaces'

export const submitExamQuesController = asyncHandler(
    async (req: UserRequest<{}, {}, ISubmitExamQues, {}>, res: Response) => {
        const data = req.body

        const { id: studentId } = req.user

        const response = await liveExamService.submitQuestion({
            ...data,
            studentId,
        })

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.EXAM_QUESTION_SUBMITTED
        )
    }
)