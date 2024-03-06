# email-scheduler-service
A simple API service to save, edit & delete email schedules. Emails will be triggered at the scheduled time.

### Setting up
Install dependencies and create local database
```
./init.sh
```
Create entities in local database
```
npm run migrate
```
Create `.env` file in the root directory and add variables mentioned in 
[.env.sample](.env.sample)

### Starting the application
```
npm start
```

### Link
Import [Collection](./email-scheduler.collection.json) to Postman for accessing the endpoints