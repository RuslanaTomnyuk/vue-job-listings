import { AppDataSource } from './data-source';
import { JobPosition } from './entity/JobPosition';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const PORT = process.env.PORT

AppDataSource.initialize().then(async() => {
  console.log('Data Source has been initialized!')

  // console.log('Inserting a new jobPosition into the database...')
  // const jobPosition = new JobPosition()
  // jobPosition.company = 'The Air Filter Company'
  // jobPosition.logo = './images/the-air-filter-company.svg'
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

}).catch(error => console.log(error))

app.listen(PORT, () => {
  console.info(`Server is running at port ${ PORT }`);
});
