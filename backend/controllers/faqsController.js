import {
  addFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
} from "../models/faqModel.js";

export const getFaqs = async (req, res) => {
  const { category } = req.query;
  // console.log("getFaqs called with category:", category);
  try {
    const faqs = await getAllFaqs(category);
    // console.log("FAQs fetched:", faqs);
    return res.status(200).json({ success: true, faqs });
  } catch (error) {
    console.log("Error While Fetching FAQs", error);
    return res
      .status(500)
      .json({ success: false, message: "Error While Fetching FAQs" });
  }
};

export const createFaq = async (req, res) => {
  try {
    const id = await addFaq(req.body);
    return res
      .status(201)
      .json({ success: true, message: "FAQ created successfully", id });
  } catch (error) {
    console.log("Error creating FAQ", error);
    return res.status(500).json({ success: false, message: "Error creating FAQ" });
  }
};

export const getFaq = async (req, res) => {
  try {
    const faq = await getFaqById(req.params.id);
    if (!faq)
      return res.status(404).json({ success: false, message: "FAQ not found" });
    res.status(200).json({ success: true, faq });
  } catch (error) {
    console.log("Error fetching FAQ", error);
    res.status(500).json({ success: false, message: "Error fetching FAQ" });
  }
};

export const updateFaqById = async (req, res) => {
  try {
    await updateFaq(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: "FAQ updated successfully" });
  } catch (error) {
    console.log("Error updating FAQ", error);
    res.status(500).json({ success: false, message: "Error updating FAQ" });
  }
};

export const deleteFaqById = async (req, res) => {
  try {
    await deleteFaq(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    console.log("Error deleting FAQ", error);
    res.status(500).json({ success: false, message: "Error deleting FAQ" });
  }
};
