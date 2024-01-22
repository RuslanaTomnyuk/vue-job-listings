// not implemented yet
function verifyRole(req, res, next) {
  try {
    const user = req.user; 
    const { role } = user;
    console.log('role', role);
    
    // extract the user role
    // check if user has no advance privileges
    // return an unathorized response
    if (role !== 'Admin') {
      return res.status(401).json({
        status: 'failed',
        message: 'You are not authorized to view this page.',
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      code: 500,
      data: [],
      message: 'Internal Server Error',
    });
  }
}

