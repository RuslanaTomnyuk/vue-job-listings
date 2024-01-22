import { AppDataSource } from './data-source';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');

    // console.log('Inserting a new role into the database...');
    // const role = new Role();
    // role.name = 'User';

    // await AppDataSource.manager.save(role);
    // console.log('Saved a new role with id: ' + role.id);
  /*
    console.log('Inserting a new role into the database...');
    const adminRole = new Role();
    adminRole.name = 'Admin';

    const userRole = new Role();
    userRole.name = 'User';

    await AppDataSource.manager.save([adminRole, userRole]);

    console.log('Roles inserted into the database!');

    const fetchedAdminRole = await AppDataSource.getRepository(Role).findOneBy({
      name: 'Admin',
    });
    const fetchedUserRole = await AppDataSource.getRepository(Role).findOneBy({
      name: 'User',
    });

    if (!fetchedAdminRole || !fetchedUserRole) {
      console.error('Roles not found in the database.');
      return;
    }

    const user = new User();
    user.email = 'rusia.vasia1@gmail.com';
    user.username = 'ruslana';
    user.password = '12345';
    user.confirmPassword = '12345';
    user.roles = [ fetchedAdminRole ];

    await AppDataSource.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);
*/
    // console.log('Inserting a new jobPosition into the database...')
    // const jobPosition = new JobPosition()
    // jobPosition.company = 'The Air Filter Company'
    // jobPosition.logo = '/images/the-air-filter-company.svg'
    // jobPosition.newPosition = false
    // jobPosition.featured = false
    // jobPosition.position = 'Front-end Dev'
    // jobPosition.role = 'Frontend'
    // jobPosition.level = 'Junior'
    // jobPosition.postedAt = '1mo ago'
    // jobPosition.contract = 'Part Time'
    // jobPosition.location = 'Worldwide'
    // jobPosition.languages = [ 'JavaScript' ]
    // jobPosition.tools = [ 'React', 'Sass' ]
    // await AppDataSource.manager.save(jobPosition)
    // console.log('Saved a new jobPosition with id: ' + jobPosition.id)
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.info(`Server is running at port ${PORT}`);
});
