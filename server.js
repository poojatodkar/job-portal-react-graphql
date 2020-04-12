const express = require('express');
const path = require('path');
const cors = require('cors');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
// GraphQL schema
const schema = buildSchema(`
    type Query {
        product(id: String): Products
        products(createdAt: String): [Products]
    },
    type Products {
        id: String
        name: String
        description: String
        image: String
        createdAt: String
        votes: String
    }
`);

const products = [
    {
        "id": "cd88252a-7dd9-4e64-ada5-22f2c8445d11",
        "createdAt": "2019-07-23",
        "name": "Are we out of masks yet?",
        "description": "<p>We show available inventory of masks that ship immediately.</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbFp0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f734969405d0081763d0377fb6dd5c2e756d63a8/SquishyLogoBlue2018.png",
        "votes": "10"
    },
    {
        "id": "c7017099-670c-47b0-846e-9e64015770c1",
        "createdAt": "2019-10-03",
        "name": "7reads",
        "description": "<p>A minimal mindful reading list for Google Chrome.</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTV0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7313393a0dba64967782fe10b9109c3a4d8ee400/gu-github.png",
        "votes": "30"
    },
    {
        "id": "7505e22a-124f-4b3f-8180-7e59a1d03007",
        "createdAt": "2018-05-13",
        "name": "Stacks",
        "description": "<p>Your personal kanban to do and project manager</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcWx0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--06631f3b4c321cb3dbc2559a1697f662c4b9907a/quantitec.png",
        "votes": "1"
    },
    {
        "id": "359ac522-6b62-4ed2-8e03-58b48bcebb43",
        "createdAt": "2020-04-12",
        "name": "Matter",
        "description": "<p>Take control of your career. Peer feedback for professionals</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcVp0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5fd552a9b5bd35257984ab5b7998fbc118a5818b/quantitec.png",
        "votes": "7"
    },
    {
        "id": "c99860e3-7b0f-42df-aef8-30ffa70ae47a",
        "createdAt": "2020-01-20",
        "name": "Black Tea Motorbikes",
        "description": "<p>Electric motorbikes which are clean, silent & stylish</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcUZ0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--190e9edf60aa3f06fbe0b548172064d6660456c3/huge.png",
        "votes": "11"
    },
    {
        "id": "ee5bd5dc-599b-45ed-838f-3125d2962e77",
        "createdAt": "2020-04-11",
        "name": "Buddy: The Wellness Bot",
        "description": "<p>Wellness tips, quotes, and positivity WhatsApped to you.</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcHB0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--25dbeecf27a324df4c28f80167f05da50028ee83/Axians.png",
        "votes": "41"
    },
    {
        "id": "4ad93fd5-5874-41de-954b-0890f226dbd5",
        "createdAt": "2020-04-13",
        "name": "Calcular",
        "description": "<p>Mental maths done right, with speech-to-text and AI</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcFZ0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2c92eb2601edcf017eb545346fbe157b175e2532/1280px-Logo-livestorm.svg.png",
        "votes": "24"
    },
    {
        "id": "4ab06979-9645-49df-9921-3ff8255bb526",
        "createdAt": "2020-04-14",
        "name": "Trends: Your next business idea, delivered weekly",
        "description": "<p>Receive a free copy of Trends, The Hustle's premium market intelligence newsletter.</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcE50IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cd2931b8e0605ad7c9eb5e939b86568502d8425f/Axians.png",
        "votes": "15"
    },
    {
        "id": "dbfc02f2-fd77-11e3-9627-a101934ea25e",
        "createdAt": "2020-04-10",
        "name": "Delicious Illustrations",
        "description": "<p>Food illustrations and icons for your apps and websites</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbVZXIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9c05f76669a8a274c3fae7dc7128d140337838a2/ffeaf00c-0450-4d8f-b620-ef1a1742675c",
        "votes": "10"
    },
    {
        "id": "8297ba2e-fe78-4812-a130-918c176127d3",
        "createdAt": "2020-04-09",
        "name": "Scamlord.ai by Onerent",
        "description": "<p>Detect fake landlords and stop rental scams</p>\n",
        "image": 'https://ph-files.imgix.net/dfe4b3ea-dcd8-41b6-94c9-452914b08fd9',
        "votes": "1"
    },
    {
        "id": "c2792584-30b3-47d0-8d58-2dcb8f7d3046",
        "createdAt": "2020-04-08",
        "name": "Nomi",
        "description": "<p>A creature for your Apple Watch you need to keep alive</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb3h0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ff8492be2be51badd438cd0d42ffd3373bc5e02b/logo%20elekta.jpeg",
        "votes": null
    },
    {
        "id": "ebaf50cf-c45e-44f9-aa49-08806ea1ed6c",
        "createdAt": "2020-04-13",
        "name": "Epoch: Guitar Tuner",
        "description": "<p>Tuner for your ukulele, bass and guitar</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb2R0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--14936795907083d46770112557b3c6ef60e11479/Zeiss.png",
        "votes": "19"
    },
    {
        "id": "dc52046b-fd8e-4502-95fa-02edb9991576",
        "createdAt": "2020-04-12",
        "name": "Loft Radio",
        "description": "<p>Exploring new ways of supporting artists online</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb1Z0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--f8e4d7a021afb3a8814ac51e52e70d13f33f6bf2/logo.png",
        "votes": "21"
    },
    {
        "id": "ac8d1c1f-46f3-414a-a392-9043f493fca3",
        "createdAt": "2020-04-14",
        "name": "Nod - Reactions for Google Meet",
        "description": "<p>Get real-time reactions from muted team members</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb050IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d6c90b7c200e89f017f728c67de94733594148d5/logo.png",
        "votes": "47"
    },
    {
        "id": "cfa67870-72c3-4a2e-ae5a-0dd74828a4be",
        "createdAt": "2020-04-13",
        "name": "Salmon",
        "description": "<p>Spotlight for Finder</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBb0Z0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--ed8bfad88cf2dca3e632e9e6b97d56997f0f572a/logo_innogames.png",
        "votes": "25"
    },
    {
        "id": "944289ad-3fa5-41c3-a366-1564b2653ea0",
        "createdAt": "2020-04-12",
        "name": "Froyo Party",
        "description": "<p>Free video calling for you and your friends</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbkp0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--450f9c0ef6e81503373fda83c226ee03c32fab06/logo_innogames.png",
        "votes": "1"
    },
    {
        "id": "35337ae5-8538-4258-95f4-510040fdbe86",
        "createdAt": "2020-04-12",
        "name": "Batzoom",
        "description": "<p>A newly designed bat for all kinds of sports</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbkJ0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1e47ed7d74f8eb4950a20afea680d3eb97550ebe/Frame%202.png",
        "votes": null
    },
    {
        "id": "056ce8a5-7520-448a-a0a6-fa954bb6e1f2",
        "createdAt": "2020-04-12",
        "name": "NoCodery 2.0",
        "description": "<p>No-Code Job Board on Steroids</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcnRwIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--de5106947fdc894d8b0ecfc306bd86aa74d02651/bentobox-logo-220px.png",
        "votes": "14"
    },
    {
        "id": "b6558f1b-2aed-4534-9ee4-d1cccc66e0a9",
        "createdAt": "2020-04-12",
        "name": "Sloth Moments",
        "description": "<p>Count down, count up and remind special moments in style</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa1p0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5f5c23e5e5ac3152254f2612941465686558abff/adjust%20logo.png",
        "votes": "10"
    },
    {
        "id": "79b673f0-7777-439e-8e26-54c414581a9b",
        "createdAt": "2020-04-13",
        "name": "COFFEEJACK",
        "description": "<p>Non-electric pocket-sized espresso machine</p>\n",
        "image": 'https://ph-files.imgix.net/5ee0d6d7-5856-4262-b63b-8848726a0bb9',
        "votes": "1"
    },
    {
        "id": "95aa009d-8b3c-41b4-bc2e-a4411039aad2",
        "createdAt": "2020-04-12",
        "name": "Avoy",
        "description": "<p>Discover hidden destinations to wander off the beaten path</p>\n",
        "image": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0J0IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5c7f856d3cf900181dcc7c6aa8c9075920c66e24/schwarz.jpg",
        "votes": "22"
    }
];

const getProduct = function (args) {
    const id = args.id;
    return products.find(position => position.id == id);
}
const getProducts = function (args) {
    console.log('args', args)
    const filteredProducts = products.filter((item) => {
        for (let key in args) {
            if (item[key] === undefined || item[key] != args[key])
                return false;
        }
        return true;
    });
    return filteredProducts;
}
const root = {
    product: getProduct,
    products: getProducts
};
// Create an express server and a GraphQL endpoint
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/graphql', cors(), express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(process.env.PORT || 4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));