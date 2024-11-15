import mongoose from "mongoose";

const carouselSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: 50,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: 500,
  },
  image: {
    type: String,
    required: [true, "Please add image"],
  },
});

const subDomainDB = mongoose.connection.useDb("women");

const WCarousel = subDomainDB.model("Carousel", carouselSchema);

export default WCarousel;
