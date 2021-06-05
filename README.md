# Assignment3 - Back End

## Students

Eden Berdugo - 313591331
Barak Falach - 312470396

## URL

https://github.com/Web-Development-Environments-2021/assignment-3-2-313591331_312470396

## Football League management API:

Documented by using Swagger : https://app.swaggerhub.com/apis/Berdugo1994/FootballLeagueManagements/1.0.0

The app relies on Sportmonks API, and Microsoft DB.

To run the server on your local environment:

1.Clone the repository.

2.open vscode at the repo path.

3.cd project.

4.npm i (or npm install).

5.cd .. and hit the debugger button(Green triangle). or you can stay on ./project path and enter at the terminal "npm start".

  - you're more than welcome to edit by yourself the scripts at : package.json , scripts .

6.now you can test the endpoints using client side such as localhost:3000/api swagger ui, or postman collection.

###### To use our DB and SportMonks credentials use:
* Azure DB
  * tedious_userName=footballnew
  * tedious_password=25101511eb!
  * tedious_server=footballnew.database.windows.net
  * tedious_database=footballnewdatabase
* Cookie
  * COOKIE_SECRET=24101511
* Sportmonks API Token
  *  api_token=L3DPWF84GYDfShDGEffKIbURjPQnBVoVZICj468fDmWiHtwtCE5NWroOxdCg
* Cryption code:
  * bcrypt_saltRounds=13

#### to use this - create a .env file in "./project" path. paste the next TEXT:
tedious_userName=footballnew

tedious_password=25101511eb!

tedious_server=footballnew.database.windows.net

tedious_database=footballnewdatabase

COOKIE_SECRET=24101511

api_token=L3DPWF84GYDfShDGEffKIbURjPQnBVoVZICj468fDmWiHtwtCE5NWroOxdCg

bcrypt_saltRounds=13
