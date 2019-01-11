/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Has all URLs defined', function(){
            allFeeds.forEach(function(aFeed){
                url = aFeed.url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    
        it('Has all URL names defined', function(){
            allFeeds.forEach(function(aFeed){
                urlName = aFeed.name;
                expect(urlName).toBeDefined();
                expect(urlName.length).not.toBe(0);
            });
        });
    });

    /* A new test suite named "The menu" */
    /* This test ensures the menu element is hidden by default.*/
    describe('The menu',function(){

        it('Menu element is hidden by default', function(){
            expect(document.body.classList.contains('menu-hidden')).toBeTruthy();
        });

        /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('Menu toggles when clicked', function() {
            //Very first click, shows menu
            document.body.querySelector('.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            //Second click hides menu
            document.body.querySelector('.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });
         

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * A loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach (function(done) {
            loadFeed(0, done);
        });
         it('Entry in a feed',function(done) {
            /*check if feeds have been loaded by checking
             *there is at least one .entry class in .feed container*/
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            done();
         });
    });
    /* A new test suite named "New Feed Selection" */
    
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function(){
        
        let oldContent, newContent;

        beforeEach(function(done){
            loadFeed(0, function(){
                oldContent = document.getElementsByClassName('feed')[0].innerText;
                loadFeed(3, function(){
                    newContent = document.getElementsByClassName('feed')[0].innerText;
                    done();
                });
            });
        });

        it('Feed changes content', function(done){
            expect(oldContent).not.toEqual(newContent);
            done();
        });

    });
         
}());
