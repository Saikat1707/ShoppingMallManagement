import Offer from "../models/offer.js";

const offerDAO = {
  async createOffer(data) {
    return await Offer.create(data);
  },

  async getAllOffers() {
    return await Offer.find().populate("shop");
  },

  async getOfferById(id) {
    return await Offer.findById(id).populate("shop");
  },

  async updateOffer(id, data) {
    return await Offer.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteOffer(id) {
    return await Offer.findByIdAndDelete(id);
  },

  async getOffersByShop(shopId) {
    return await Offer.find({ shop: shopId });
  },

  async changeStatus(id, active) {
    return await Offer.findByIdAndUpdate(id, { active }, { new: true });
  },
};

export default offerDAO;
