import asyncHandler from '../../../utils/AsyncHandler'
import ResponseBuilder from '../../../utils/ResponseBuilder'
import { StatusCodes } from '../../../enums/StatusCodes'
import { SuccessMessages } from '../../../enums/SuccessMessages'
import organizationService from '../services/organization.service'
import { Request, Response } from 'express'
import { IRegisterUser } from '../../../common/interfaces'

export const registerOrganizationController = asyncHandler(
    async (req: Request<{}, {}, IRegisterUser>, res: Response) => {
        const data = req.body
        const response = await organizationService.registerOrganization(data)
        return new ResponseBuilder(
            res,
            StatusCodes.SUCCESS,
            response,
            SuccessMessages.ORGANIZATION_REGISTERED
        )
    }
)