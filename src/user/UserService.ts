import { logger } from "../logger";
import { BaseService } from "../common/service/BaseService";
import { UserDao } from "./UserDao";
import { ErrorItem } from "../common/model/ErrorItem";

export class UserService extends BaseService {
    private userDao = new UserDao();

    constructor() {
        super();
    }

    /**
     * Get a user
     * @param aToken
     *      The user's token
     * @param callback
     *      A callback function(err, result)
     */
    public get(aToken:string, callback:any) {
        var self = this;

        this.userDao.read(aToken, function(err:any, response:any){
            if (err) {
                callback(self._handleDAOError(err));
            }
            else if (!response) {
                callback(new ErrorItem("token", "user not found"));
            }
            else {
                logger.debug('%s', response);
                callback(undefined, response);
            }
        });
    }
}