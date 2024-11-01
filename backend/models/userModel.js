export const user_model = {
    username: {
        exists: true,
        notEmpty: true,
        escape: true
    },
    password: {
        exists: true,
        notEmpty: true,
    }
}