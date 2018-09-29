/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

// $() function Starts

$(function() {


    /*
    * Suite 1 - RSS Feeds
    */

    /* New test suite named "RSS Feeds" starts */

    /* This test suite just contains a related set of tests.
    *  This suite is all about the RSS feeds definitions,
    *  the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This test make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); // Defining all feeds
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined URL', function () {
            allFeeds.forEach(function (feed) {
                url = feed.url;
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0); // Non-empty URL
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined name', function () {
            allFeeds.forEach(function(feed) {
                name = feed.name;
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0); // Non-empty Name
            });
        });

    }); // Suite 1 Ends


    /*
    * Suite 2 - The menu
    */
    

    /* New test suite named "The menu" starts */
    describe('The menu', function() {

        /* This test ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true); // Menu was hidden
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when menu icon is clicked', function () {
            $('.menu-icon-link').click(); // At first click
            expect($('body').hasClass('menu-hidden')).toBe(false); // Menu was shown

            $('.menu-icon-link').click(); // At second click
            expect($('body').hasClass('menu-hidden')).toBe(true); // Menu was hidden again
        });

    }); // Suite 2 Ends


    /*
    * Suite 3 - Initial Entries
    */


    /* New test suite named "Initial Entries" starts */
    describe('Initial Entries', function () {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * 
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        it('have atleast a single .entry element within the .feed container', function (done) {
            let container = $('.feed .entry');
            expect(container.length).not.toBeLessThan(1); // Having atleast single element
            done(); // Asynchronous done() function
        });

    }); // Suite 3 Ends


    /*
    * Suite 4 - New Feed Selection
    */


    /* New test suite named "New Feed Selection" starts */
    describe('New Feed Selection', function () {

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        let feedOld, feedNew;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feedOld = $('.feed').html();
                loadFeed(1, function () {
                    feedNew = $('.feed').html();
                    done(); // Asynchronous done() function
                });
            });
        });

        it('is changing the content when every new feed is loaded', function () {
            expect(feedOld).not.toEqual(feedNew);
        });

    }); // Suite 4 Ends

}); // $() function Ends
