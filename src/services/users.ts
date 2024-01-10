import { UserType } from '../application/domain/utils/user.type'
import { User } from '../application/domain/models/auth/user'

/**
 * User service
 * @class
 * @category Services
 */
class UserService {

    /**
     * Method for requesting data from a user by identifier.
     * @param {UserType} type User type.
     * @param {string} userId User identifier.
     * @returns { Promise<User>}
     */
    public async getById(type: UserType, userId: string): Promise<User> {
        return new Promise(resolve => {
            window.setTimeout(() => resolve(new User()), 1000)
        })
    }

}

const userService: UserService = new UserService()

export default userService
