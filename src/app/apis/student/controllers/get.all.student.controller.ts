import asyncHandler from '../../../utils/AsyncHandler'
import { UserRequest } from '../../../common/interfaces'
import studentService from '../services/student.service'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import { Roles } from '../../../enums/Roles'

export const getAllStudentController = asyncHandler(
    async (req: UserRequest<{}, {}, {}, { limit: number; offset: number }>, res: any) => {
        const { limit, offset } = req.query
        let { id: organizationId, role } = req.user

        if (role === Roles.PROCTOR) {
            organizationId = req.user.organizationId
        }

        const response = await studentService.getAllStudents({
            limit,
            offset,
            organizationId,
        })

        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.GET_ALL_STUDENTS
        )
    }
)