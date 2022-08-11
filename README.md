# NotionSupplyCo. README
NotionSupplyCo, a fullstack e-commerce application for a merchant dedicated to sales of instant cameras and related supplies. Users are able to view details for products, read, write, edit, and delete reviews for products, add items they wish cart, and complete orders on the site.

## Live Link
Live on Heroku: https://notionsupplyco.herokuapp.com/
## Technologies
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a6176617363726970742d2532333332333333302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d253233463744463145](https://user-images.githubusercontent.com/75456670/184199939-c0888b78-1134-4944-b506-250dd9a17b0c.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d2532334533344632362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465](https://user-images.githubusercontent.com/75456670/184199971-25788a93-c7b4-42f3-a9ff-ec6240706766.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f637373332d2532333135373242362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465](https://user-images.githubusercontent.com/75456670/184199992-42133f69-83cc-466d-af57-815f02b18e95.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f53657175656c697a652d3532423045373f7374796c653d666f722d7468652d6261646765266c6f676f3d53657175656c697a65266c6f676f436f6c6f723d7768697465](https://user-images.githubusercontent.com/75456670/184200017-f0ba06a2-6dad-42ce-ab5c-fb1e94410b6a.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f657870726573732e6a732d2532333430346435392e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d253233363144414642](https://user-images.githubusercontent.com/75456670/184200043-6773b09c-38c8-40af-8c4e-80a607c9a243.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f706f7374677265732d2532333331363139322e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d706f737467726573716c266c6f676f436f6c6f723d7768697465](https://user-images.githubusercontent.com/75456670/184200071-547923e9-4422-4075-a04a-9689f9b5e808.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6865726f6b752d2532333433303039382e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6865726f6b75266c6f676f436f6c6f723d7768697465](https://user-images.githubusercontent.com/75456670/184200107-94e85075-22bc-455b-a4cb-834c552c2e84.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642](https://user-images.githubusercontent.com/75456670/184200122-e15ab8f0-254c-4579-86c0-96d681d4f611.svg)
![68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656475782d2532333539336438382e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465](https://user-images.githubusercontent.com/75456670/184200143-8bbc5444-975c-4083-9c5c-9e5d0a1f4dc8.svg)




## Run on Local Machine
1. Clone the project to your machine: `git clone https://github.com/tshao42/SupplyCo`
2. There are two directories: `/frontend` and `/backend`
* Open the terminal and `cd` into both `/frontend` and `/backend`
* In `/frontend`:
  * run `npm install` to get all dependencies installed
  * run `npm start` to start the frontend server
  * access the application on `http://localhost:3000/` 
* In `/backend`:
  * run `npm install` to get all dependencies installed
  * create a `.env` according to the `env.example`
  * create database user with same configuration in `.env`
  * run `npx dotenv sequelize db:create` to create database
  * (optional) change seed data in `/backend/db/seeders`
  * run `npx dotenv sequelize db:migrate` to migrate the database
  * run `npx dotenv sequelize db:seed:all` to seed the database
  * (optional) for migrate and seed: type in `npm run cleanSlate` for pre-scriped sequence of database migrating/seeding
  * if, in any case, there is any problem with the database, run `npx dotenv sequelize db:drop`, and repeat the steps above
  * run `npm start` to start the backend server, api routes are accessible via `http://localhost:5000/api`

## Demo
Homepage
<img width="1728" alt="Screen Shot 2022-08-11 at 10 50 16 AM" src="https://user-images.githubusercontent.com/75456670/184202687-0fb3d535-ff44-4bab-970f-453cd73feed0.png">
Products Page
<img width="1728" alt="Screen Shot 2022-08-11 at 10 50 25 AM" src="https://user-images.githubusercontent.com/75456670/184202987-534d883a-f044-4df1-9e79-df25e5536df1.png">
<img width="1728" alt="Screen Shot 2022-08-11 at 10 50 32 AM" src="https://user-images.githubusercontent.com/75456670/184203023-3c8bb7ca-f697-4e7e-8e64-93e52655bd05.png">
Product Information Page
<img width="1728" alt="Screen Shot 2022-08-11 at 10 50 41 AM" src="https://user-images.githubusercontent.com/75456670/184203136-09fde7e1-fe92-4fad-9f36-41759590d09e.png">
Cart Page
<img width="1728" alt="Screen Shot 2022-08-11 at 10 50 57 AM" src="https://user-images.githubusercontent.com/75456670/184203331-734b026d-8f36-4caa-b640-aaba7e6e2a93.png">
Checkout Page
<img width="1728" alt="Screen Shot 2022-08-11 at 10 54 41 AM" src="https://user-images.githubusercontent.com/75456670/184203894-f28c2150-ec31-458b-826e-ff65dedc4a70.png">
Edit Order Page
<img width="1728" alt="Screen Shot 2022-08-11 at 10 51 25 AM" src="https://user-images.githubusercontent.com/75456670/184204076-10c491a6-2a69-4e8e-8913-b9b2340fbf1b.png">
Order Detail Page
<img width="1728" alt="Screen Shot 2022-08-11 at 10 51 03 AM" src="https://user-images.githubusercontent.com/75456670/184204447-cf8f957f-b926-4896-a8f3-9821a035183f.png">
Write review
<img width="1728" alt="Screen Shot 2022-08-11 at 10 56 42 AM" src="https://user-images.githubusercontent.com/75456670/184205205-bba5748d-482c-4ec4-87e9-ff0d0ab602bc.png">
Edit Review
<img width="1728" alt="Screen Shot 2022-08-11 at 10 52 15 AM" src="https://user-images.githubusercontent.com/75456670/184204683-cbdcf648-9b41-4580-b4ec-bef8f09144d4.png">

