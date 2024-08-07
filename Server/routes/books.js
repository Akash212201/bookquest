const express=require("express")
const router=express.Router();

const {createBook,showBookInformation,showBookDetail,showAllEbooks,editBook,getAdminBooks,deleteBook,reqBook}=require("../controllers/ebooks");
const {auth,isCustomer,isAdmin}=require("../middlewares/auth")
const {RatingAndReviews,getAverageRating,getAllRatings}=require("../controllers/RatingAndReviews")

router.post("/createBook",auth,isAdmin,createBook);
router.get("/showAllBooks",showAllEbooks);
router.post("/showBookDetails",showBookInformation)
router.post("/showBookdetails",auth,isCustomer,showBookInformation)
router.post("/editBook",auth,isAdmin,editBook)
router.get("/allAdminBooks",auth,isAdmin,getAdminBooks)
router.post("/deleteBook",auth,isAdmin,deleteBook)
router.post("/reqBook",reqBook);


// rating and reviews
router.post("/ratingAndReviews",auth,isCustomer,RatingAndReviews)
router.post("/getAverageRating",getAverageRating)
router.get("/getAllRatings",getAllRatings);


module.exports=router;