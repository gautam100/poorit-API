const validateSignupRequest = (req, res, next) => {
    const { name, email, password, mobile, gender, organization } = req.body;
    // console.log('Full request body:', req.body);
    // console.log('Individual fields:');
    // console.log('name:', name);
    // console.log('email:', email);
    // console.log('password:', password);
    // console.log('mobile:', mobile);
    // console.log('gender:', gender);
    // console.log('organization:', organization);

    if (!name || !email || !password || !mobile || !gender || !organization) {
        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!email) missingFields.push('email');
        if (!password) missingFields.push('password');
        if (!mobile) missingFields.push('mobile');
        if (!gender) missingFields.push('gender');
        if (!organization) missingFields.push('organization');

        return res.status(400).json({
            success: false,
            message: `Required fields missing: ${missingFields.join(', ')}`
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters long'
        });
    }

    next();
};

const validateLoginRequest = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }

    next();
};

module.exports = {
    validateSignupRequest,
    validateLoginRequest
};