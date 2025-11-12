import offerDAO from "../DAO/offerDao.js";

export const createOffer = async (req, res) => {
  try {
    const offerData = { ...req.body, shop: req.body.shop || req.user.shop };
    const offer = await offerDAO.createOffer(offerData);
    res.status(201).json({ message: "Offer created successfully", offer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOffers = async (req, res) => {
  try {
    const offers = await offerDAO.getAllOffers();
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOfferById = async (req, res) => {
  try {
    const offer = await offerDAO.getOfferById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const offer = await offerDAO.updateOffer(req.params.id, req.body);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.status(200).json({ message: "Offer updated successfully", offer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const offer = await offerDAO.deleteOffer(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOffersByShop = async (req, res) => {
  try {
    const offers = await offerDAO.getOffersByShop(req.params.shopId);
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { active } = req.body;
    const offer = await offerDAO.changeStatus(req.params.id, active);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.status(200).json({ message: `Offer status updated`, offer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
