module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    // console.log('userRole', userRole)
    if (!role.includes(userRole)) {
      return res.status(400).send('You are not authorized to access this')
    }

    next();
  }
}