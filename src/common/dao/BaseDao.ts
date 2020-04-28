import { logger } from "../../logger";

export class BaseDAO {
    public handleDatabaseError(err: any) : object {
        logger.error("[BaseDAO] Error from database : " + err);

        return {
            layer: 'database',
            message: err.code
        };
    }
}