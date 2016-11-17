#!/usr/bin/env node

require('dotenv').config(); //Set up local enviroment, for authentication
//TODO: make a config file
var getContentIds = require('./js/modules/getcontentids'),
    updateContentIds = require('./js/modules/updatecontentids'),
    publishContentIds = require('./js/modules/publishContentIds'),
    getUserPreferences = require('./js/modules/getUserPreferences'),
    contentFilters = require('./js/modules/contentfilters'),
    staticIds = require('./js/modules/staticids'),
    files = require('./js/modules/files'),
    fs = require('fs'),
    Converter = require('csvtojson').Converter;
// The name of the CSV file from the second Command Line argument

getUserPreferences(function(){
  var answers = arguments[0],
      method = answers.method,
      contentType = answers.contentType,
      filename = answers.importFilename,
      csvFilePath = './imports/' + filename;


});

/////NOTE I need to figure out how to handle the query string for blog vs pages

// var csvFileName = './imports/' + process.argv[3];

var appAction = process.argv[2], // 'get' OR 'update' OR 'publish' from CLI
    accessToken = process.env.ACCESS_TOKEN_KB, // from local .env file
    cosContentType = 'pages', // 'pages' OR 'blog-posts'
    filter = contentFilters.noFilter, // MUST use 'noFilter' as default
    queryString = {
      access_token: accessToken,
      // Optional Parameters for Getting Content
      limit: 2500, // Default
      // offset: 0,
      // archived: false,
      // is_draft: false, // Site pages only
      // blog_author_id: 34623,
      // campaign: staticIds.campaignIds.workflows,
      content_group_id: staticIds.groupIds.quickAnswerBlog, // A specfic blog's *blog only*
      // created__gt: 4329847200000, // Supports exact, range, gt, gte, lt, lte
      // deleted_at__lt: 34572630000,
      // publish_date: 542376570000,
      // updated: 793847290000
      // name__icontains: 'user guide', //Supports contains, icontains, ne
      // slug: 'user-guide' // Supports exact, in
      // subcategory: 'site_page', // OR landing_page
      // state: 'PUBLISHED' // OR PUBLISHED, SCHEDULED *blog only*
    };
////////////////////////////////////////
// if (appAction === 'get') { // Used for getting page/post data
//   console.log('Getting...');
//   getContentIds(filter, cosContentType, queryString); // Returns a CSV file in the exports folder
//
// } else if (appAction === 'update' || 'publish') { // Used for updating pages/posts
//   csvConverter=new Converter({}); // new converter instance
//   csvConverter.on('end_parsed', function(jsonObj) { // Converts csv to json object
//       if (appAction === 'update') {
//         console.log('Updating...');
//         updateContentIds(jsonObj, cosContentType, queryString);
//       } else if (appAction === 'publish') {
//         console.log("Publishing...");
//         publishContentIds(jsonObj, cosContentType, queryString);
//       }
//   });
//   fs.createReadStream(csvFileName).pipe(csvConverter); //read from file
//
// } else {
//   console.warn("variable 'appAction' must be either 'get', 'update' or 'publish'");
// }
