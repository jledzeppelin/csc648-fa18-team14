/**
 * @file app.js
 * @description This is the controller for the ExpressJS application. It accepts HTTP requests and passes them on to the
 * business layer
 *
 */


const path = require('path')
const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

nunjucks.configure('views', {
  autoescape: true,
  express: app,

});

const SETTINGS = require('./settings')
const Business = require('./business')

const VIEWS_PATH = path.join(__dirname, '/views')
const STATIC_PATH = path.join(__dirname, '/static')
const IMAGE_PATH = path.join(__dirname, '/images')

let port = SETTINGS.web.port

// -------
// -------
// APIs
// -------
// -------

/**
 * @description Returns all recently approved Posts
 * @author Anthony Carrasco acarras4@mail.sfsu.edu
 */
app.get('/api/post/recent',async function(req,res){
    let latestApprovedPost = await Business.getLatestApprovedPost()
    res.json(latestApprovedPost)
});

/**
 * @description Returns Posts based on queries passed in. The queries are "name", "category", "page", "sort"
 * @author Anthony Carrasco acarras4@mail.sfsu.edu
 * Jack Cole jcole2@mail.sfsu.edu
 */
app.get('/api/post/search',async function (req,res){
    let name = req.query.name
    let category = req.query.category
    let page = req.query.page
    let sort = req.query.sort

    let searchResults = await Business.searchPosts(name, category, page, sort)
    res.json(searchResults)
});

/**
 * @description Returns the full details of a single post based on its id.
 * @author Jack Cole jcole2@mail.sfsu.edu
 */
app.get('/api/post/:id/',async function(req, res){
    let id = req.params.id
    let post = await Business.getPost(id)
    res.json(post)

});


/**
 * @description Returns all Posts corresponding to category_id
 * @author Anthony Carrasco acarras4@mail.sfsu.edu
 */
app.get('api/category/:category_id/',async function(req,res){
    let category_id = req.params.category_id
    let Category = await Business.getCategory(category_id).catch(function(err){
        console.error(err)
        return {};
    })
    res.json(Category);
});


/**
 * @description Creates a post
 * @author Ryan Jin
 */
app.post('/api/post/create',async function(req,res){
    let title = req.params.body
    let description = req.params.body
    let category = req.params.body
    let image = req.params.body

    let createPost = await Business.createPost(title, description, category, image).catch(function(err){
        console.error(err)
        return {};
    })
    res.json(createPost)
});

//register/authenticate
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.post('/api/register', async function (req, res){
    var newUser={
        "first_name":req.body.first_name,
        "last_name":req.body.email,
        "email":req.body.email,
        "login_password":req.body.login_password,
        "is_banned":0
    }

    let registeredUser = await Business.registerUser(newUser).catch(function(err){
        console.error(err)
        return {};
    })

    res.json(registeredUser)
})

app.post('/api/login', async function (req,res){
    //TODO
})

// -------
// -------
// PAGES
// -------
// -------

app.set('view engine', 'njk');
app.set('views', VIEWS_PATH);

/**
 * @description Home page of site. Renders index.njk
 * @author Jack Cole jcole2@mail.sfsu.edu
 */
app.get('/',function(req, res){
  res.render('index');
})


/**
 * @description Search page. Renders search.njk
 * @author Jack Cole jcole2@mail.sfsu.edu
 */
app.get('/search/',function(req, res) {
    let name = req.query.name
    let page = req.query.page
    let sort = req.query.sort
    res.render('search', {
        name: name,
        page: page,
        sort: sort,
    })
})


// -------
// -------
// STATIC
// -------
// -------

/**
 * @description Serves static routes in static directory
 * @author  Juan
 *          Jack Cole jcole2@mail.sfsu.edu
 */
app.use('/static',express.static(STATIC_PATH))

/**
 * @description Serves images from the image directory
 * @author     Jack Cole jcole2@mail.sfsu.edu
 */
app.use('/images',express.static(IMAGE_PATH))

/**
 * @description Initializes the application to listen on the HTTP port
 */
app.listen(port, () => {
    console.log('Server running on port ' + port)
})