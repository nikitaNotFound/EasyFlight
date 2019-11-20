# EasyFlight

# Frontend #

Frontend part of application was created with React.js library. The version of library I used is 16.8.6. To run it, first of all, you need to install node.js (<https://nodejs.org/en/>). Also you can find all the packages to run application in package.json and install them just running `npm install` command. The list of used libraries:

+ _Bootstrap 4.3.1_
https://www.npmjs.com/package/bootstrap

+ _Http Status Codes 1.3.2_
https://www.npmjs.com/package/http-status-codes

+ _Moment.js 2.24.0_
https://www.npmjs.com/package/moment

+ _Node sass 4.12.0_
https://www.npmjs.com/package/node-sass

+ _React color 2.17.3_
https://www.npmjs.com/package/react-color

+ _React google login 5.0.7_
https://www.npmjs.com/package/react-google-login

+ _React redux 7.1.1_
https://www.npmjs.com/package/react-redux

+ _Redux 4.0.4_
https://www.npmjs.com/package/redux  

## Where can i configure application behaviour? About config.json ##

+ `API_URL` | define url of your backend application
+ `BOOK_TYPES` | book types. You need to keep them the same as on backend  
+ `GOOGLE_CLIENT_ID` | define your google client for google-athentification  
+ `DEFAULT_PAGE_LIMIT` | default page size for render flights and airplanes

---

# Backend #

Backend part of application was created with asp.net core 3.0. To run it, you need to install .net core 3 or later on your pc (https://dotnet.microsoft.com/download/dotnet-core/3.0).  

Server uses REST-api architecture (https://drive.google.com/file/d/0BwQRhBGRbZAdYzdIT09mWU1acFk/view)  

I used MS SQL Server as Database source and Dapper library as micro-ORM to work with it.

All business-logic unit-tests were written using MSTest library.

The list of third-party libraries i used in project:  

+ _AutoMapper_ https://automapper.org
+ _Dapper_ https://dapper-tutorial.net
+ _Google API library_ https://developers.google.com/api-client-library/dotnet/?hl=EN
+ _Serilog_ https://serilog.net  

## Where can i configure application behaviour? About appsettings.json ##

I tried to wrote application, that can be modified for your goals. By changing appsettings.json you can change some parameteres, to make application work as you need.  

There a couple of sections in config file:  

+ ### Connection string ###  
Change it to connect application with your MS SQL server.

+ ### Allowed origins ###
Here you need to define origins of trusted client' applications that can use server.

+ ### Jwt settings ###
`Secret` | define your own secret key for creating jwt tokens.  
`ExpirationTime` | time before jwt token becomes non-valid  
`Issuer` | address of your server

+ ### Booking settings ###
`ExpirationTime` | the time server waits for booking seat payment  
`TimeUntilBookingAvailable` | the time until user can book a flight' seat

+ ### Account updating settings ###
`NameUpdatingInterval` | the time before user can update it' name again  
`AvatarUpdatingInterval` | the time before user can update it' avatar again  

+ ### Files uploading settings ###
`StoragePath` | path on yout local machine where files will be storing  
`AllowedExtensions` | file extensions that user can upload to the server (in this application you need only images)  
`MaxMbSize` | maximum size of file in megabytes  
`StaticFilesCatalogName` | the catalog name, which users can use to get files  
`StaticFilesHost` | address of files server  

+ ### Pagination settings ###
`MaxPageLimit` | count of items user can query by one time  
`DefaultPage` | default number of page that uses if user don't define it in request  
`DefaultPageSize` | default page size that uses if user don't define it in request

+ ### Profile caching settings ###
`CachingTime` | the time user info caching for  
`PhotoKey` | the key application uses to save and load path to user' image
`FlightHistoryKey` | the key application uses to save and load user' flight history  

+ ### Serilog ###
You can how read how to tune logger settings in official serilog documentation (https://serilog.net)
