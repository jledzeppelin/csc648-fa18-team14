class GatorTraderAPI {

    /**
     * @description Grabs a list of posts from the database
     * @param title {string} The title of a post. Will do a partial match
     * @param category {Number} The category ID. Set to 0 if looking through all categories
     * @param page {Number} The page number. Starts at 1.
     * @param sort {String} The sorting method
     * @param callback {function} The function to be called after results are found
     * @author Jack Cole jcole2@mail.sfsu.edu
     */
    static getPosts(title, category, page, sort, callback){
        let url = '/api/post/search/'+title+'/'+category+'/'+page+'/'+sort
        return $.get(url,callback)
    }


}