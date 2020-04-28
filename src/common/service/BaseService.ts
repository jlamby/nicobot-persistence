import { logger } from "../../logger";

export class BaseService {
    public _handleDAOError(err: string) : object {
        logger.error("[BaseService] Error from DAO : " + JSON.stringify(err));

        return {
            message: "Error in the persistence unit."
        };
    }
}