import Error400 from '../../../errors/Error400'
import Permissions from '../../../security/permissions'
import { getOrganization } from '../../../serverless/integrations/usecases/devto/getOrganization'
import { getUserByUsername } from '../../../serverless/integrations/usecases/devto/getUser'
import PermissionChecker from '../../../services/user/permissionChecker'

export default async (req, res) => {
  new PermissionChecker(req).validateHasAny([
    Permissions.values.integrationCreate,
    Permissions.values.integrationEdit,
  ])

  if (req.query.username) {
    const result = await getUserByUsername(req.query.username)
    await req.responseHandler.success(req, res, result)
  } else if (req.query.organization) {
    const result = await getOrganization(req.query.organization)
    await req.responseHandler.success(req, res, result)
  } else {
    // throw bad request since we don't have either of the query params
    await req.responseHandler.error(req, res, new Error400(req.language))
  }
}
