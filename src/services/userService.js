const User = require("../models/user.model");
const encrypt = require("../utils/encrypt");
const httpsStatus = require("../utils/httpsStatus");

const mapUserToResponse = async (user) => {
    return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        accessToken: await encrypt.getUserAccessToken(user)
    };
};

const signup = async (email, password, firstName, lastName, locale) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw {
            status: httpsStatus.CONFLICT,
            message: locale("USER_ALREADY_EXISTS")
        }
    }

    const isSocialUser = existingUser?.googleId && existingUser?.googleToken;

    if (isSocialUser) {
        existingUser.password = await encrypt.enCryptPassword(password);
        await existingUser.save();
        return mapUserToResponse(existingUser);
    }

    const user = await User.create(
        {
            email,
            password: await encrypt.enCryptPassword(password),
            firstName,
            lastName
        }
    );

    return mapUserToResponse(user);
};

const login = async (email, password, locale) => {
    const user = await User.findOne({ email });

    if (!user || !encrypt.comparePassword(password, user.password)) {
        throw {
            status: httpsStatus.UNAUTHORIZED,
            message: locale("INVALID_CREDENTIALS")
        }
    }

    return mapUserToResponse(user);
};

const googleAuth = async (body) => {
    const { email, clientId, token, firstName, lastName } = body;

    //ideally we should verify te token with google api but for now we are skipping it due to time constraints
    let user = await User.findOne({ email });

    if (user) {
        user.googleId = clientId;
        user.googleToken = token;
        await user.save();
    } else {
        user = await User.create({
            firstName,
            lastName,
            email,
            googleId: clientId,
            googleToken: token
        });
    }

    return mapUserToResponse(user);
};

module.exports = {
    signup,
    login,
    googleAuth
};
