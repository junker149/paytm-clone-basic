const zod = require("zod");

const signup = zod.object({
    email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(4)
});

const signin = zod.object({
    email: zod.string().email(),
    password: zod.string().min(4)
})

const updateBody = zod.object({
    password: zod.string().min(4).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    userID: zod.string(),
})

module.exports = {
    signup,
    signin,
    updateBody
};
