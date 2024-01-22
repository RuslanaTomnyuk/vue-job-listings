// not implemented yet 
import { User } from '../entity/User';
import { getUserByEmail } from '../helpers/getUserByEmail';
import { AppDataSource } from '../data-source';

const checkAdmin = async (req, res, next) => {
  //we get the logged user from our token middleware
  //check token @ L42
  console.log('inside checkadmin middleware')
  console.log('user from req is: ', req.user)
  const loggedUsername = req.user.username
  // console.log({loggedUsername})
  const loggedUser = await AppDataSource.getRepository(User).findOneBy({
    username: loggedUsername,
  })
  // console.log({loggedUser})

  if(loggedUser.role === 'Admin'){
    //if the logged user is the admin
    //we go to the next action (middleware)
    //in this case the next action is calling the /updateuser endpoint
    return next()
  }
  //if the user isn't an admin return a 403
  return res.status(403).send('You are not an admin');
}

module.exports = checkAdmin
