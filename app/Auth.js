/**
 * Authentication class
 */
class Auth {
    /**
     * Login user
     *
     * @returns {string|any}
     */
    login() {
        let username = process.argv
            .filter((arg)=>arg.startsWith('--username'))
            .shift()
            ?.split('=')
            ?.pop();

        return username === undefined
            ? 'Non authorized user'
            : username;
    }
}

export default Auth;
